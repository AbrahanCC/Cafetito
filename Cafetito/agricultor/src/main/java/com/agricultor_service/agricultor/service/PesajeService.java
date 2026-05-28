package com.agricultor_service.agricultor.service;

import com.agricultor_service.agricultor.dto.CuentaBeneficioResponse;
import com.agricultor_service.agricultor.model.*;
import com.agricultor_service.agricultor.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PesajeService {

    private static final Long ESTADO_PESAJE_INICIADO = 2L;
    private static final Long ESTADO_PESAJE_FINALIZADO = 3L;

    private final PesajeRepository pesajeRepository;
    private final ParcialidadRepository parcialidadRepository;
    private final AgricultorRepository agricultorRepository;
    private final TransporteRepository transporteRepository;
    private final TransportistaRepository transportistaRepository;
    private final BeneficioClientService beneficioClientService;

    public PesajeService(
            PesajeRepository pesajeRepository,
            ParcialidadRepository parcialidadRepository,
            AgricultorRepository agricultorRepository,
            TransporteRepository transporteRepository,
            TransportistaRepository transportistaRepository,
            BeneficioClientService beneficioClientService
    ) {
        this.pesajeRepository = pesajeRepository;
        this.parcialidadRepository = parcialidadRepository;
        this.agricultorRepository = agricultorRepository;
        this.transporteRepository = transporteRepository;
        this.transportistaRepository = transportistaRepository;
        this.beneficioClientService = beneficioClientService;
    }

    public List<Pesaje> listarPorAgricultor(Long idAgricultor) {

        if (idAgricultor == null) {
            throw new RuntimeException(
                    "No se encontró el agricultor asociado al usuario autenticado"
            );
        }

        return pesajeRepository.findByAgricultor_IdAgricultor(idAgricultor);
    }

    public Pesaje obtenerPorId(Long idPesaje) {

        return pesajeRepository.findById(idPesaje)
                .orElseThrow(() ->
                        new RuntimeException("Pesaje no encontrado")
                );
    }

    @Transactional
    public Pesaje crear(Long idAgricultor, Pesaje pesaje) {

        if (idAgricultor == null) {
            throw new RuntimeException(
                    "No se encontró el agricultor asociado al usuario autenticado"
            );
        }

        if (pesaje.getIdCuenta() == null) {
            throw new RuntimeException(
                    "Debe seleccionar una cuenta"
            );
        }

        if (pesaje.getPesoTotalActual() == null
                || pesaje.getPesoTotalActual() <= 0) {

            throw new RuntimeException(
                    "El peso total actual debe ser mayor a 0"
            );
        }

        CuentaBeneficioResponse cuenta =
                beneficioClientService.obtenerCuenta(
                        pesaje.getIdCuenta()
                );

        validarCuentaParaPesaje(
                cuenta,
                idAgricultor,
                pesaje.getPesoTotalActual()
        );

        Agricultor agricultor =
                agricultorRepository.findById(idAgricultor)
                        .orElseThrow(() ->
                                new RuntimeException("Agricultor no encontrado")
                        );

        DetalleCatalogo estado =
                new DetalleCatalogo();

        estado.setIdDetalleCatalogo(
                ESTADO_PESAJE_INICIADO
        );

        pesaje.setIdPesaje(null);
        pesaje.setAgricultor(agricultor);
        pesaje.setEstado(estado);
        pesaje.setMedida(obtenerMedida(pesaje));
        pesaje.setFecha(LocalDateTime.now());
        pesaje.setCantidadParcialidades(0);

        Pesaje guardado =
                pesajeRepository.save(pesaje);

        beneficioClientService.marcarCuentaPesajeIniciado(
                cuenta.getIdCuenta()
        );

        return guardado;
    }

    @Transactional
    public Pesaje finalizar(Long idPesaje) {

        Pesaje pesaje =
                pesajeRepository.findById(idPesaje)
                        .orElseThrow(() ->
                                new RuntimeException("Pesaje no encontrado")
                        );

        if (pesaje.getCantidadParcialidades() == null
                || pesaje.getCantidadParcialidades() <= 0) {

            throw new RuntimeException(
                    "No se puede finalizar un pesaje sin parcialidades"
            );
        }

        Double totalParcialidades =
                parcialidadRepository.sumarPesoPorPesaje(
                        idPesaje
                );

        Double objetivo =
                pesaje.getPesoTotalActual();

        if (objetivo == null || objetivo <= 0) {
            throw new RuntimeException(
                    "El pesaje no tiene peso objetivo válido"
            );
        }

        Double minimo =
                objetivo * 0.95;

        Double maximo =
                objetivo * 1.05;

        if (totalParcialidades < minimo
                || totalParcialidades > maximo) {

            throw new RuntimeException(
                    "El pesaje no cumple la tolerancia permitida de ±5%"
            );
        }

        DetalleCatalogo estado =
                new DetalleCatalogo();

        estado.setIdDetalleCatalogo(
                ESTADO_PESAJE_FINALIZADO
        );

        pesaje.setEstado(estado);

        liberarTransporteYTransportista(
                pesaje.getIdPesaje(),
                pesaje.getAgricultor().getIdAgricultor()
        );

        Pesaje finalizado =
                pesajeRepository.save(pesaje);

        beneficioClientService.marcarCuentaPesajeFinalizado(
                pesaje.getIdCuenta()
        );

        return finalizado;
    }

    private void validarCuentaParaPesaje(
            CuentaBeneficioResponse cuenta,
            Long idAgricultor,
            Double pesoPesaje
    ) {

        if (cuenta == null) {
            throw new RuntimeException(
                    "Cuenta no encontrada"
            );
        }

        if (cuenta.getNitAgricultor() == null
                || !cuenta.getNitAgricultor().equals(idAgricultor)) {

            throw new RuntimeException(
                    "La cuenta no pertenece al agricultor autenticado"
            );
        }

        if (!"CUENTA_CREADA".equals(cuenta.getEstado())
                && !"PESAJE_INICIADO".equals(cuenta.getEstado())) {

            throw new RuntimeException(
                    "La cuenta ya no admite nuevos pesajes"
            );
        }

        Double saldoPendiente =
                cuenta.getSaldoPendiente();

        if (saldoPendiente == null) {

            Double objetivo =
                    cuenta.getPesoObjetivo() == null
                            ? 0.0
                            : cuenta.getPesoObjetivo();

            Double acumulado =
                    cuenta.getPesoAcumulado() == null
                            ? 0.0
                            : cuenta.getPesoAcumulado();

            saldoPendiente =
                    objetivo - acumulado;
        }

        if (pesoPesaje > saldoPendiente) {
            throw new RuntimeException(
                    "El peso del pesaje supera el saldo pendiente de la cuenta"
            );
        }
    }

    private void liberarTransporteYTransportista(
            Long idPesaje,
            Long idAgricultor
    ) {

        List<Transporte> transportes =
                transporteRepository.findByAgricultor_IdAgricultor(
                        idAgricultor
                );

        for (Transporte transporte : transportes) {

            if (idPesaje.equals(transporte.getPesajeAsociado())) {

                transporte.setDisponible(true);
                transporte.setPesajeAsociado(null);

                transporteRepository.save(transporte);
            }
        }

        List<Transportista> transportistas =
                transportistaRepository.findByAgricultor_IdAgricultor(
                        idAgricultor
                );

        for (Transportista transportista : transportistas) {

            if (idPesaje.equals(transportista.getPesajeAsociado())) {

                transportista.setDisponible(true);
                transportista.setPesajeAsociado(null);

                transportistaRepository.save(transportista);
            }
        }
    }

    private DetalleCatalogo obtenerMedida(Pesaje pesaje) {

        if (pesaje.getMedida() == null) {
            throw new RuntimeException(
                    "La medida de peso es obligatoria"
            );
        }

        Long idMedida =
                pesaje.getMedida().getIdDetalleCatalogo();

        if (idMedida == null) {
            throw new RuntimeException(
                    "Debe seleccionar una medida"
            );
        }

        if (!idMedida.equals(4L)
                && !idMedida.equals(5L)
                && !idMedida.equals(6L)) {

            throw new RuntimeException(
                    "Medida inválida"
            );
        }

        DetalleCatalogo medida =
                new DetalleCatalogo();

        medida.setIdDetalleCatalogo(idMedida);

        return medida;
    }
}