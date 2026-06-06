package com.Beneficio.Beneficio.service;

import com.Beneficio.Beneficio.model.Cuenta;
import com.Beneficio.Beneficio.model.ParcialidadBeneficio;
import com.Beneficio.Beneficio.repository.CuentaRepository;
import com.Beneficio.Beneficio.repository.ParcialidadBeneficioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcialidadBeneficioService {

    private final ParcialidadBeneficioRepository parcialidadRepository;
    private final CuentaRepository cuentaRepository;
    private final HistorialCuentaService historialService;
    private final BitacoraService bitacoraService;

    private static final double PORCENTAJE_TOLERANCIA = 0.05;

    private static final String CUENTA_CREADA = "CUENTA_CREADA";
    private static final String CUENTA_ABIERTA = "CUENTA_ABIERTA";
    private static final String PESAJE_INICIADO = "PESAJE_INICIADO";
    private static final String PESAJE_FINALIZADO = "PESAJE_FINALIZADO";
    private static final String CUENTA_CERRADA = "CUENTA_CERRADA";
    private static final String CUENTA_CONFIRMADA = "CUENTA_CONFIRMADA";

    private static final String PENDIENTE_RECEPCION = "PENDIENTE_RECEPCION";
    private static final String RECIBIDA = "RECIBIDA";
    private static final String RECHAZADA = "RECHAZADA";
    private static final String PESAJE_REALIZADO = "PESAJE_REALIZADO";

    public List<ParcialidadBeneficio> listarPorCuenta(Long idCuenta) {
        return parcialidadRepository.findByCuenta_IdCuenta(idCuenta);
    }

    public List<ParcialidadBeneficio> listarPendientesPesoCabal() {
        /*
         * Peso Cabal solo debe ver parcialidades que ya fueron recibidas por Beneficio.
         * La cuenta puede estar abierta o con pesaje iniciado.
         */
        return parcialidadRepository.findByEstadoAndCuenta_EstadoIn(
                RECIBIDA,
                List.of(
                        CUENTA_ABIERTA,
                        PESAJE_INICIADO
                )
        );
    }

    public List<ParcialidadBeneficio> listarPesadas() {
        return parcialidadRepository.findByEstado(PESAJE_REALIZADO);
    }

    public List<ParcialidadBeneficio> listarConBoleta() {
        return parcialidadRepository.findByBoletaTrue();
    }

    @Transactional
    public ParcialidadBeneficio registrarDesdeMicroAgricultor(
            ParcialidadBeneficio parcialidad,
            String usuario
    ) {

        if (parcialidad.getCuenta() == null || parcialidad.getCuenta().getIdCuenta() == null) {
            throw new RuntimeException("La parcialidad debe estar asociada a una cuenta");
        }

        if (parcialidad.getIdParcialidadAgricultor() == null) {
            throw new RuntimeException("La parcialidad del agricultor es obligatoria");
        }

        if (parcialidadRepository.existsByIdParcialidadAgricultor(
                parcialidad.getIdParcialidadAgricultor()
        )) {
            throw new RuntimeException("Parcialidad ya registrada en beneficio");
        }

        Cuenta cuenta = cuentaRepository.findById(parcialidad.getCuenta().getIdCuenta())
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        validarCuentaParaRegistrarParcialidad(cuenta);
        recalcularTolerancia(cuenta);
        validarTransporte(parcialidad);
        validarTransportista(parcialidad);

        parcialidad.setIdParcialidadBeneficio(null);
        parcialidad.setCuenta(cuenta);
        parcialidad.setEstado(PENDIENTE_RECEPCION);
        parcialidad.setDetalle("Pendiente recepción en beneficio");
        parcialidad.setFechaRecepcionParcialidad(null);
        parcialidad.setPesoBascula(null);
        parcialidad.setDiferenciaPeso(null);
        parcialidad.setFechaPesoBascula(null);
        parcialidad.setBoleta(false);
        parcialidad.setFechaBoleta(null);

        ParcialidadBeneficio guardada = parcialidadRepository.save(parcialidad);

        bitacoraService.registrarOperacion(
                "REGISTRAR_PARCIALIDAD_DESDE_AGRICULTOR",
                usuario,
                cuenta.getIdCuenta(),
                "Parcialidad " + guardada.getIdParcialidadBeneficio() + " pendiente de recepción"
        );

        return guardada;
    }

    @Transactional
    public ParcialidadBeneficio recibirDesdeBeneficio(
            Long idParcialidad,
            String usuario
    ) {

        ParcialidadBeneficio parcialidad = parcialidadRepository.findById(idParcialidad)
                .orElseThrow(() -> new RuntimeException("Parcialidad no encontrada"));

        if (!PENDIENTE_RECEPCION.equals(parcialidad.getEstado())) {
            throw new RuntimeException("La parcialidad no está pendiente de recepción");
        }

        if (parcialidad.getFechaRecepcionParcialidad() != null) {
            throw new RuntimeException("La parcialidad ya fue procesada");
        }

        Cuenta cuenta = cuentaRepository.findById(parcialidad.getCuenta().getIdCuenta())
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        validarCuentaParaRecibir(cuenta);
        recalcularTolerancia(cuenta);
        validarTransporte(parcialidad);
        validarTransportista(parcialidad);

        Double pesoObjetivo = obtenerValor(cuenta.getPesoObjetivo());
        Double pesoActual = obtenerValor(cuenta.getPesoAcumulado());
        Double pesoEnviado = obtenerValor(parcialidad.getPesoEnviado());
        Double tolerancia = calcularToleranciaPermitida(pesoObjetivo);

        Double nuevoAcumulado = pesoActual + pesoEnviado;
        Double maximoPermitido = pesoObjetivo + tolerancia;

        /*
         * Beneficio no recibe parcialidades que superen el +5%
         * del peso acordado.
         */
        if (nuevoAcumulado > maximoPermitido) {
            parcialidad.setEstado(RECHAZADA);
            parcialidad.setDetalle("Excede peso permitido");
            parcialidad.setFechaRecepcionParcialidad(LocalDateTime.now());
            parcialidadRepository.save(parcialidad);

            throw new RuntimeException("La parcialidad excede el peso permitido de +5%");
        }

        parcialidad.setEstado(RECIBIDA);
        parcialidad.setDetalle("Espera de ingreso");
        parcialidad.setFechaRecepcionParcialidad(LocalDateTime.now());

        ParcialidadBeneficio actualizada = parcialidadRepository.save(parcialidad);

        cuenta.setPesoAcumulado(nuevoAcumulado);
        cuenta.setSaldoPendiente(pesoObjetivo - nuevoAcumulado);
        cuenta.setCantidadParcialidades(obtenerEntero(cuenta.getCantidadParcialidades()) + 1);
        cuenta.setDiferenciaTotal(nuevoAcumulado - pesoObjetivo);
        cuenta.setTolerancia(tolerancia);

        /*
         * Regla:
         * Cuenta Abierta se coloca cuando ingresa el primer cargamento.
         * Aquí Beneficio ya recibió la parcialidad.
         *
         * NO se finaliza aquí.
         * PESAJE_FINALIZADO se coloca hasta que Peso Cabal registre el peso
         * y el total de báscula esté dentro de +-5%.
         */
        if (CUENTA_CREADA.equals(cuenta.getEstado())
                || CUENTA_ABIERTA.equals(cuenta.getEstado())) {
            cuenta.setEstado(CUENTA_ABIERTA);
        }

        Cuenta cuentaActualizada = cuentaRepository.saveAndFlush(cuenta);

        historialService.registrarCambio(
                cuentaActualizada,
                cuentaActualizada.getEstado(),
                cuentaActualizada.getDiferenciaTotal(),
                cuentaActualizada.getTolerancia()
        );

        bitacoraService.registrarOperacion(
                "RECIBIR_PARCIALIDAD_BENEFICIO",
                usuario,
                cuentaActualizada.getIdCuenta(),
                "Parcialidad " + actualizada.getIdParcialidadBeneficio() + " recibida"
        );

        return actualizada;
    }

    @Transactional
    public ParcialidadBeneficio rechazarDesdeBeneficio(
            Long idParcialidad,
            String usuario
    ) {

        ParcialidadBeneficio parcialidad = parcialidadRepository.findById(idParcialidad)
                .orElseThrow(() -> new RuntimeException("Parcialidad no encontrada"));

        if (!PENDIENTE_RECEPCION.equals(parcialidad.getEstado())) {
            throw new RuntimeException("Solo se puede rechazar una parcialidad pendiente de recepción");
        }

        if (parcialidad.getFechaRecepcionParcialidad() != null) {
            throw new RuntimeException("La parcialidad ya fue procesada");
        }

        parcialidad.setEstado(RECHAZADA);
        parcialidad.setDetalle("Rechazado");
        parcialidad.setFechaRecepcionParcialidad(LocalDateTime.now());

        ParcialidadBeneficio actualizada = parcialidadRepository.save(parcialidad);

        bitacoraService.registrarOperacion(
                "RECHAZAR_PARCIALIDAD_BENEFICIO",
                usuario,
                parcialidad.getCuenta().getIdCuenta(),
                "Parcialidad " + parcialidad.getIdParcialidadBeneficio() + " rechazada"
        );

        return actualizada;
    }

    @Transactional
    public ParcialidadBeneficio actualizarPesoBascula(
            Long idParcialidad,
            Double pesoBascula,
            String tipoMedida,
            String observaciones,
            String usuario
    ) {

        ParcialidadBeneficio parcialidad = parcialidadRepository.findById(idParcialidad)
                .orElseThrow(() -> new RuntimeException("Parcialidad no encontrada"));

        if (!RECIBIDA.equals(parcialidad.getEstado())) {
            throw new RuntimeException("La parcialidad no se encuentra disponible para pesaje");
        }

        if (parcialidad.getPesoBascula() != null) {
            throw new RuntimeException("La parcialidad ya tiene peso báscula registrado");
        }

        if (pesoBascula == null || pesoBascula <= 0) {
            throw new RuntimeException("El peso báscula debe ser mayor a 0");
        }

        Cuenta cuenta = cuentaRepository.findById(parcialidad.getCuenta().getIdCuenta())
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        validarCuentaParaPesoCabal(cuenta);
        recalcularTolerancia(cuenta);

        Double diferenciaPeso = pesoBascula - obtenerValor(parcialidad.getPesoEnviado());

        parcialidad.setPesoBascula(pesoBascula);
        parcialidad.setDiferenciaPeso(diferenciaPeso);
        parcialidad.setTipoMedida(tipoMedida);
        parcialidad.setObservaciones(observaciones);
        parcialidad.setEstado(PESAJE_REALIZADO);
        parcialidad.setDetalle("Pesaje Realizado");
        parcialidad.setFechaPesoBascula(LocalDateTime.now());

        ParcialidadBeneficio actualizada = parcialidadRepository.save(parcialidad);

        Double pesoObjetivo = obtenerValor(cuenta.getPesoObjetivo());
        Double pesoBasculaActual = obtenerValor(cuenta.getPesoBasculaTotal());
        Double nuevoPesoBasculaTotal = pesoBasculaActual + pesoBascula;
        Double tolerancia = calcularToleranciaPermitida(pesoObjetivo);
        Double diferenciaTotal = nuevoPesoBasculaTotal - pesoObjetivo;

        cuenta.setPesoBasculaTotal(nuevoPesoBasculaTotal);
        cuenta.setTolerancia(tolerancia);
        cuenta.setDiferenciaTotal(diferenciaTotal);

        /*
         * Regla:
         * Pesaje Iniciado se coloca cuando se recibe el primer peso de báscula.
         */
        cuenta.setEstado(PESAJE_INICIADO);
        cuenta.setResultadoTolerancia(null);

        /*
         * Regla:
         * Pesaje Finalizado se coloca cuando se recibe el último peso
         * y el total queda dentro del rango permitido de +-5%.
         *
         * Si queda faltante, sigue PESAJE_INICIADO.
         * Si queda sobrante fuera de tolerancia, se marca PESAJE_FINALIZADO
         * con resultado SOBRANTE para que no pueda confirmarse.
         */
        if (Math.abs(diferenciaTotal) <= tolerancia) {
            cuenta.setEstado(PESAJE_FINALIZADO);
            cuenta.setResultadoTolerancia("ACEPTADO_EN_PARAMETRO");
        } else if (diferenciaTotal > tolerancia) {
            cuenta.setEstado(PESAJE_FINALIZADO);
            cuenta.setResultadoTolerancia("SOBRANTE");
        } else {
            cuenta.setEstado(PESAJE_INICIADO);
            cuenta.setResultadoTolerancia("FALTANTE");
        }

        Cuenta cuentaActualizada = cuentaRepository.saveAndFlush(cuenta);

        historialService.registrarCambio(
                cuentaActualizada,
                cuentaActualizada.getEstado(),
                cuentaActualizada.getDiferenciaTotal(),
                cuentaActualizada.getTolerancia()
        );

        bitacoraService.registrarOperacion(
                "ACTUALIZAR_PESO_BASCULA",
                usuario,
                cuentaActualizada.getIdCuenta(),
                "Peso cabal parcialidad " + idParcialidad
        );

        return actualizada;
    }

    @Transactional
    public ParcialidadBeneficio generarBoleta(
            Long idParcialidad,
            String usuario
    ) {

        ParcialidadBeneficio parcialidad = parcialidadRepository.findById(idParcialidad)
                .orElseThrow(() -> new RuntimeException("Parcialidad no encontrada"));

        if (!PESAJE_REALIZADO.equals(parcialidad.getEstado())) {
            throw new RuntimeException("No se puede generar boleta sin pesaje");
        }

        if (parcialidad.getPesoBascula() == null) {
            throw new RuntimeException("No se puede generar boleta sin peso báscula");
        }

        if (Boolean.TRUE.equals(parcialidad.getBoleta())) {
            throw new RuntimeException("La boleta ya existe");
        }

        parcialidad.setBoleta(true);
        parcialidad.setFechaBoleta(LocalDateTime.now());
        parcialidad.setDetalle("Boleta Generada");

        ParcialidadBeneficio actualizada = parcialidadRepository.save(parcialidad);

        bitacoraService.registrarOperacion(
                "GENERAR_BOLETA",
                usuario,
                parcialidad.getCuenta().getIdCuenta(),
                "Boleta parcialidad " + idParcialidad
        );

        return actualizada;
    }

    private void validarCuentaParaRegistrarParcialidad(Cuenta cuenta) {
        if (CUENTA_CERRADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta cerrada");
        }

        if (CUENTA_CONFIRMADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta confirmada");
        }

        if (PESAJE_FINALIZADO.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta ya finalizada");
        }
    }

    private void validarCuentaParaRecibir(Cuenta cuenta) {
        if (CUENTA_CERRADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta cerrada");
        }

        if (CUENTA_CONFIRMADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta confirmada");
        }

        if (PESAJE_FINALIZADO.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta ya finalizada");
        }
    }

    private void validarCuentaParaPesoCabal(Cuenta cuenta) {
        if (CUENTA_CERRADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta cerrada");
        }

        if (CUENTA_CONFIRMADA.equals(cuenta.getEstado())) {
            throw new RuntimeException("Cuenta confirmada");
        }

        if (!CUENTA_ABIERTA.equals(cuenta.getEstado())
                && !PESAJE_INICIADO.equals(cuenta.getEstado())) {
            throw new RuntimeException("La cuenta no está disponible para pesaje de báscula");
        }
    }

    private void validarTransporte(ParcialidadBeneficio parcialidad) {
        if (parcialidad.getEstadoTransporte() == null || parcialidad.getEstadoTransporte() != 1) {
            throw new RuntimeException("Transporte bloqueado");
        }
    }

    private void validarTransportista(ParcialidadBeneficio parcialidad) {
        if (parcialidad.getEstadoTransportista() == null || parcialidad.getEstadoTransportista() != 1) {
            throw new RuntimeException("Transportista bloqueado");
        }
    }

    private void recalcularTolerancia(Cuenta cuenta) {
        cuenta.setTolerancia(
                calcularToleranciaPermitida(cuenta.getPesoObjetivo())
        );
    }

    private Double calcularToleranciaPermitida(Double pesoObjetivo) {
        if (pesoObjetivo == null || pesoObjetivo <= 0) {
            return 0.0;
        }

        return pesoObjetivo * PORCENTAJE_TOLERANCIA;
    }

    private Double obtenerValor(Double valor) {
        return valor == null ? 0.0 : valor;
    }

    private Integer obtenerEntero(Integer valor) {
        return valor == null ? 0 : valor;
    }
}