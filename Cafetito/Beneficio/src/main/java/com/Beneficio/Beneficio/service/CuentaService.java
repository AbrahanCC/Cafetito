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

    /*
     * Regla correcta:
     * La tolerancia NO es 5 fijo.
     * La tolerancia es +-5% del peso objetivo de la cuenta.
     *
     * Ejemplo:
     * Peso objetivo: 500
     * Tolerancia permitida: 500 * 0.05 = 25
     * Rango válido: 475 a 525
     */
    private static final double PORCENTAJE_TOLERANCIA = 0.05;

    private static final String CUENTA_CREADA = "CUENTA_CREADA";
    private static final String CUENTA_ABIERTA = "CUENTA_ABIERTA";
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
                        CUENTA_ABIERTA,
                        PESAJE_INICIADO,
                        PESAJE_FINALIZADO,
                        CUENTA_CERRADA,
                        CUENTA_CONFIRMADA
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

        Double toleranciaCalculada =
                calcularToleranciaPermitida(cuenta.getPesoObjetivo());

        cuenta.setFechaEnvio(LocalDateTime.now());
        cuenta.setEstado(CUENTA_CREADA);

        cuenta.setPesoAcumulado(0.0);
        cuenta.setPesoBasculaTotal(0.0);
        cuenta.setSaldoPendiente(cuenta.getPesoObjetivo());
        cuenta.setCantidadParcialidades(0);
        cuenta.setDiferenciaTotal(0.0);

        /*
         * Aquí guardamos el valor real permitido.
         * Si pesoObjetivo = 500, tolerancia = 25.
         */
        cuenta.setTolerancia(toleranciaCalculada);
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
                "Cuenta creada con tolerancia del 5%"
        );

        return guardada;
    }

    @Transactional
    public Cuenta actualizar(Long id, Cuenta cuenta, String usuario) {

        Cuenta existente = cuentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        /*
         * Regla de negocio:
         * Solo se puede editar una cuenta cuando todavía está creada.
         */
        if (!CUENTA_CREADA.equals(existente.getEstado())) {
            throw new RuntimeException(
                    "Solo se puede editar una cuenta en estado Cuenta Creada"
            );
        }

        if (cuenta.getIdAgricultor() == null) {
            throw new RuntimeException("Debe indicar el agricultor");
        }

        if (cuenta.getPesoObjetivo() == null || cuenta.getPesoObjetivo() <= 0) {
            throw new RuntimeException("Peso objetivo inválido");
        }

        existente.setIdAgricultor(cuenta.getIdAgricultor());
        existente.setPesoObjetivo(cuenta.getPesoObjetivo());

        /*
         * Si cambia el peso objetivo, también cambia la tolerancia.
         */
        existente.setTolerancia(
                calcularToleranciaPermitida(existente.getPesoObjetivo())
        );

        existente.setSaldoPendiente(
                existente.getPesoObjetivo()
                        - obtenerValor(existente.getPesoAcumulado())
        );

        existente.setDiferenciaTotal(
                obtenerValor(existente.getPesoAcumulado())
                        - existente.getPesoObjetivo()
        );

        Cuenta actualizada = cuentaRepository.save(existente);

        bitacoraService.registrarOperacion(
                "ACTUALIZAR_CUENTA",
                usuario,
                actualizada.getIdCuenta(),
                "Cuenta actualizada en estado Cuenta Creada"
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

        if (nuevoEstado.equals(cuenta.getEstado())) {
            throw new RuntimeException("El nuevo estado no puede ser igual al estado actual");
        }

        /*
         * Flujo permitido:
         * PESAJE_FINALIZADO -> CUENTA_CERRADA
         * CUENTA_CERRADA -> CUENTA_CONFIRMADA
         */
        if (CUENTA_CERRADA.equals(nuevoEstado)) {

            if (!PESAJE_FINALIZADO.equals(cuenta.getEstado())) {
                throw new RuntimeException(
                        "Solo se puede cerrar una cuenta en estado Pesaje Finalizado"
                );
            }

            cuenta.setEstado(CUENTA_CERRADA);
            cuenta.setFechaLlegada(LocalDateTime.now());

        } else if (CUENTA_CONFIRMADA.equals(nuevoEstado)) {

            if (!CUENTA_CERRADA.equals(cuenta.getEstado())) {
                throw new RuntimeException(
                        "Solo se puede confirmar una cuenta en estado Cuenta Cerrada"
                );
            }

            actualizarResultadoTolerancia(cuenta);

            /*
             * Regla de negocio:
             * Cuenta Confirmada solo si los pesos coinciden o están dentro de +-5%.
             */
            if (!"ACEPTADO_EN_PARAMETRO".equals(cuenta.getResultadoTolerancia())) {
                throw new RuntimeException(
                        "No se puede confirmar la cuenta porque está fuera de la tolerancia permitida de +-5%"
                );
            }

            cuenta.setEstado(CUENTA_CONFIRMADA);

        } else {
            throw new RuntimeException("Estado nuevo no permitido");
        }

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

    @Transactional
    public Cuenta marcarPesajeIniciado(Long idCuenta, String usuario) {

        Cuenta cuenta = cuentaRepository.findById(idCuenta)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        if (CUENTA_CERRADA.equals(cuenta.getEstado())
                || CUENTA_CONFIRMADA.equals(cuenta.getEstado())
                || PESAJE_FINALIZADO.equals(cuenta.getEstado())) {

            throw new RuntimeException("La cuenta no admite nuevos pesajes");
        }

        cuenta.setTolerancia(
                calcularToleranciaPermitida(cuenta.getPesoObjetivo())
        );

        /*
         * Conservamos el nombre del método porque ya lo consume el micro Agricultor,
         * pero alineamos el estado con la regla de negocio:
         *
         * CUENTA_CREADA -> CUENTA_ABIERTA
         *
         * Cuenta Abierta representa que la cuenta ya puede recibir cargamentos.
         */
        if (CUENTA_CREADA.equals(cuenta.getEstado())) {

            cuenta.setEstado(CUENTA_ABIERTA);

            Cuenta actualizada = cuentaRepository.save(cuenta);

            historialService.registrarCambio(
                    actualizada,
                    actualizada.getEstado(),
                    actualizada.getDiferenciaTotal(),
                    actualizada.getTolerancia()
            );

            bitacoraService.registrarOperacion(
                    "ABRIR_CUENTA",
                    usuario,
                    actualizada.getIdCuenta(),
                    "Cuenta abierta para recibir cargamentos"
            );

            return actualizada;
        }

        return cuenta;
    }

    @Transactional
    public Cuenta marcarPesajeFinalizado(Long idCuenta, String usuario) {

        Cuenta cuenta = cuentaRepository.findById(idCuenta)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        if (!CUENTA_ABIERTA.equals(cuenta.getEstado())
                && !PESAJE_INICIADO.equals(cuenta.getEstado())) {

            throw new RuntimeException(
                    "Solo se puede finalizar una cuenta abierta o con pesaje iniciado"
            );
        }

        cuenta.setTolerancia(
                calcularToleranciaPermitida(cuenta.getPesoObjetivo())
        );

        /*
         * No se permite finalizar si el peso acumulado recibido todavía
         * no está completo dentro del rango de +-5%.
         */
        Double pesoObjetivo = obtenerValor(cuenta.getPesoObjetivo());
        Double pesoAcumulado = obtenerValor(cuenta.getPesoAcumulado());
        Double toleranciaPermitida = calcularToleranciaPermitida(pesoObjetivo);

        Double diferencia = pesoAcumulado - pesoObjetivo;

        if (Math.abs(diferencia) > toleranciaPermitida) {
            throw new RuntimeException(
                    "No se puede finalizar el pesaje porque el peso recibido no está dentro de la tolerancia de +-5%"
            );
        }

        cuenta.setEstado(PESAJE_FINALIZADO);
        cuenta.setDiferenciaTotal(diferencia);
        cuenta.setSaldoPendiente(pesoObjetivo - pesoAcumulado);

        Cuenta actualizada = cuentaRepository.save(cuenta);

        historialService.registrarCambio(
                actualizada,
                actualizada.getEstado(),
                actualizada.getDiferenciaTotal(),
                actualizada.getTolerancia()
        );

        bitacoraService.registrarOperacion(
                "FINALIZAR_PESAJE_CUENTA",
                usuario,
                actualizada.getIdCuenta(),
                "Cuenta marcada como pesaje finalizado"
        );

        return actualizada;
    }

    private void actualizarResultadoTolerancia(Cuenta cuenta) {

        Double pesoObjetivo = obtenerValor(cuenta.getPesoObjetivo());
        Double pesoBascula = obtenerValor(cuenta.getPesoBasculaTotal());

        Double toleranciaPermitida =
                calcularToleranciaPermitida(pesoObjetivo);

        Double diferencia = pesoBascula - pesoObjetivo;

        cuenta.setTolerancia(toleranciaPermitida);
        cuenta.setDiferenciaTotal(diferencia);

        if (Math.abs(diferencia) <= toleranciaPermitida) {
            cuenta.setResultadoTolerancia("ACEPTADO_EN_PARAMETRO");
        } else if (diferencia < 0) {
            cuenta.setResultadoTolerancia("FALTANTE");
        } else {
            cuenta.setResultadoTolerancia("SOBRANTE");
        }
    }

    private Double calcularToleranciaPermitida(Double totalParcialidad) {

        if (totalParcialidad == null || totalParcialidad <= 0) {
            return 0.0;
        }

        return totalParcialidad * PORCENTAJE_TOLERANCIA;
    }

    private Double obtenerValor(Double valor) {
        return valor == null ? 0.0 : valor;
    }
}