package com.agricultor_service.agricultor.service;

import com.agricultor_service.agricultor.model.*;
import com.agricultor_service.agricultor.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ParcialidadService {

    private static final Long ESTADO_PESAJE_INICIADO = 2L;
    private static final Long ESTADO_PARCIALIDAD_CREADA = 2L;

    private final ParcialidadRepository parcialidadRepository;
    private final PesajeRepository pesajeRepository;
    private final TransporteRepository transporteRepository;
    private final TransportistaRepository transportistaRepository;

    public ParcialidadService(
            ParcialidadRepository parcialidadRepository,
            PesajeRepository pesajeRepository,
            TransporteRepository transporteRepository,
            TransportistaRepository transportistaRepository
    ) {
        this.parcialidadRepository = parcialidadRepository;
        this.pesajeRepository = pesajeRepository;
        this.transporteRepository = transporteRepository;
        this.transportistaRepository = transportistaRepository;
    }

    public List<Parcialidad> listarPorPesaje(Long idPesaje) {
        return parcialidadRepository.findByPesaje_IdPesaje(idPesaje);
    }

    @Transactional
    public Parcialidad crear(Long idPesaje, Parcialidad parcialidad) {

        Pesaje pesaje = pesajeRepository.findById(idPesaje)
                .orElseThrow(() -> new RuntimeException("Pesaje no encontrado"));

        validarEstadoPesaje(pesaje);
        validarDatosParcialidad(parcialidad);

        String placa = parcialidad.getPlaca().trim().toUpperCase();

        Transporte transporte = transporteRepository.findByPlaca(placa)
                .orElseThrow(() -> new RuntimeException("Transporte no encontrado"));

        if (Boolean.FALSE.equals(transporte.getDisponible())
                && !idPesaje.equals(transporte.getPesajeAsociado())) {

            throw new RuntimeException("El transporte no está disponible");
        }

        Transportista transportista = transportistaRepository.findById(parcialidad.getIdTransportista())
                .orElseThrow(() -> new RuntimeException("Transportista no encontrado"));

        if (Boolean.FALSE.equals(transportista.getDisponible())
                && !idPesaje.equals(transportista.getPesajeAsociado())) {

            throw new RuntimeException("El transportista no está disponible");
        }

        Double factor = obtenerFactorConversion(pesaje);
        Double pesoKg = parcialidad.getPesoActual() * factor;

        Double pesoActualRegistrado = parcialidadRepository.sumarPesoPorPesaje(idPesaje);
        Double nuevoTotal = pesoActualRegistrado + pesoKg;

        Double maximoPermitido = pesaje.getPesoTotalActual() * 1.05;

        if (nuevoTotal > maximoPermitido) {
            throw new RuntimeException("El total de parcialidades supera la tolerancia permitida de +5%");
        }

        DetalleCatalogo estado = new DetalleCatalogo();
        estado.setIdDetalleCatalogo(ESTADO_PARCIALIDAD_CREADA);

        parcialidad.setIdParcialidad(null);
        parcialidad.setPesaje(pesaje);
        parcialidad.setIdCuenta(pesaje.getIdCuenta());
        parcialidad.setPlaca(placa);
        parcialidad.setEstado(estado);
        parcialidad.setPesoActual(pesoKg);
        parcialidad.setDiferenciaPeso(0.0);
        parcialidad.setFechaRecepcion(LocalDate.now());
        parcialidad.setHoraRecepcion(LocalTime.now());

        Parcialidad guardada = parcialidadRepository.save(parcialidad);

        pesaje.setCantidadParcialidades(
                pesaje.getCantidadParcialidades() == null
                        ? 1
                        : pesaje.getCantidadParcialidades() + 1
        );

        pesajeRepository.save(pesaje);

        transporte.setDisponible(true);
        transporte.setPesajeAsociado(null);
        transporteRepository.save(transporte);

        transportista.setDisponible(true);
        transportista.setPesajeAsociado(null);
        transportistaRepository.save(transportista);

        return guardada;
    }

    private void validarEstadoPesaje(Pesaje pesaje) {

        if (pesaje.getEstado() == null || pesaje.getEstado().getIdDetalleCatalogo() == null) {
            throw new RuntimeException("El pesaje no tiene estado asignado");
        }

        if (!pesaje.getEstado().getIdDetalleCatalogo().equals(ESTADO_PESAJE_INICIADO)) {
            throw new RuntimeException("Solo se pueden crear parcialidades en un pesaje iniciado");
        }
    }

    private void validarDatosParcialidad(Parcialidad parcialidad) {

        if (parcialidad.getPlaca() == null || parcialidad.getPlaca().isBlank()) {
            throw new RuntimeException("La placa del transporte es obligatoria");
        }

        if (parcialidad.getIdTransportista() == null) {
            throw new RuntimeException("El transportista es obligatorio");
        }

        if (parcialidad.getPesoActual() == null || parcialidad.getPesoActual() <= 0) {
            throw new RuntimeException("El peso debe ser mayor a 0");
        }
    }

    private Double obtenerFactorConversion(Pesaje pesaje) {

        if (pesaje.getMedida() == null) {
            throw new RuntimeException("El pesaje no tiene medida asignada");
        }

        Double factor = pesaje.getMedida().getFactorConversion();

        if (factor != null && factor > 0) {
            return factor;
        }

        Long idMedida = pesaje.getMedida().getIdDetalleCatalogo();

        if (idMedida.equals(4L)) return 45.3592;
        if (idMedida.equals(5L)) return 1.0;
        if (idMedida.equals(6L)) return 0.453592;

        throw new RuntimeException("La medida no tiene factor de conversión configurado");
    }
}