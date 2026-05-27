package com.Beneficio.Beneficio.service;

import com.Beneficio.Beneficio.model.Cuenta;
import com.Beneficio.Beneficio.repository.CuentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CuentaService {

    private final CuentaRepository cuentaRepository;
    private final HistorialCuentaService historialService;
    private final BitacoraService bitacoraService;

    private static final double TOLERANCIA_DEFAULT = 5.0;

    private static final String CUENTA_CREADA = "CUENTA_CREADA";
    private static final String PESAJE_INICIADO = "PESAJE_INICIADO";
    private static final String PESAJE_FINALIZADO = "PESAJE_FINALIZADO";
    private static final String CUENTA_CERRADA = "CUENTA_CERRADA";
    private static final String CUENTA_CONFIRMADA = "CUENTA_CONFIRMADA";

    public List<Cuenta> listar() {
        return cuentaRepository.findAll();
    }

    public Optional<Cuenta> obtener(Long id) {
        return cuentaRepository.findById(id);
    }

    public List<Cuenta> listarPorAgricultor(Long idAgricultor) {
        return cuentaRepository.findByIdAgricultor(idAgricultor);
    }

    public List<Cuenta> listarPorEstado(String estado) {
        return cuentaRepository.findByEstado(estado);
    }

    public List<Cuenta> listarCuentasParaPesoCabal() {
        return cuentaRepository.findByEstadoIn(
                List.of(
                        CUENTA_CONFIRMADA,
                        PESAJE_INICIADO,
                        PESAJE_FINALIZADO
                )
        );
    }

    public List<Cuenta> listarCuentasCerradas() {
        return cuentaRepository.findByEstado(CUENTA_CERRADA);
    }

    public List<Cuenta> listarCuentasConfirmadas() {
        return cuentaRepository.findByEstado(CUENTA_CONFIRMADA);
    }

    @Transactional
    public Cuenta crear(Cuenta cuenta, String usuario) {

        cuenta.setIdCuenta(null);

        if (cuenta.getIdAgricultor() == null) {
            throw new RuntimeException("Debe indicar el agricultor");
        }

        if (cuenta.getPesoObjetivo() == null || cuenta.getPesoObjetivo() <= 0) {
            throw new RuntimeException("Peso objetivo inválido");
        }

        cuenta.setFechaEnvio(LocalDateTime.now());
        cuenta.setEstado(CUENTA_CREADA);

        cuenta.setPesoAcumulado(0.0);
        cuenta.setPesoBasculaTotal(0.0);
        cuenta.setSaldoPendiente(cuenta.getPesoObjetivo());
        cuenta.setCantidadParcialidades(0);
        cuenta.setDiferenciaTotal(0.0);
        cuenta.setTolerancia(TOLERANCIA_DEFAULT);
        cuenta.setResultadoTolerancia(null);

        Cuenta guardada = cuentaRepository.save(cuenta);

        historialService.registrarCambio(
                guardada,
                guardada.getEstado(),
                0.0,
                guardada.getTolerancia()
        );

        bitacoraService.registrarOperacion(
                "CREAR_CUENTA",
                usuario,
                guardada.getIdCuenta(),
                "Cuenta creada"
        );

        return guardada;
    }

    @Transactional
    public Cuenta actualizar(Long id, Cuenta cuenta, String usuario) {

        Cuenta existente = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        existente.setIdAgricultor(cuenta.getIdAgricultor());
        existente.setPesoObjetivo(cuenta.getPesoObjetivo());

        if (cuenta.getCantidadParcialidades() != null) {
            existente.setCantidadParcialidades(cuenta.getCantidadParcialidades());
        }

        if (cuenta.getPesoAcumulado() != null) {
            existente.setPesoAcumulado(cuenta.getPesoAcumulado());
        }

        if (cuenta.getPesoBasculaTotal() != null) {
            existente.setPesoBasculaTotal(cuenta.getPesoBasculaTotal());
        }

        Cuenta actualizada = cuentaRepository.save(existente);

        bitacoraService.registrarOperacion(
                "ACTUALIZAR_CUENTA",
                usuario,
                actualizada.getIdCuenta(),
                "Cuenta actualizada"
        );

        return actualizada;
    }

    @Transactional
    public Cuenta cambiarEstado(
            Long id,
            String nuevoEstado,
            Double diferenciaTotal,
            String usuario
    ) {

        Cuenta cuenta = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        if (nuevoEstado == null || nuevoEstado.isBlank()) {
            throw new RuntimeException("Debe indicar el nuevo estado");
        }

        cuenta.setEstado(nuevoEstado);

        if (CUENTA_CERRADA.equals(nuevoEstado)) {
            cuenta.setFechaLlegada(LocalDateTime.now());
        }

        cuenta.setDiferenciaTotal(
                diferenciaTotal != null ? diferenciaTotal : 0.0
        );

        Cuenta actualizada = cuentaRepository.save(cuenta);

        historialService.registrarCambio(
                actualizada,
                nuevoEstado,
                actualizada.getDiferenciaTotal(),
                actualizada.getTolerancia()
        );

        bitacoraService.registrarOperacion(
                "CAMBIAR_ESTADO",
                usuario,
                actualizada.getIdCuenta(),
                nuevoEstado
        );

        return actualizada;
    }
}