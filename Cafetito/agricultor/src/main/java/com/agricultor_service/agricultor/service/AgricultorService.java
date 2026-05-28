package com.agricultor_service.agricultor.service;

import com.agricultor_service.agricultor.dto.AgricultorDetalleResponse;
import com.agricultor_service.agricultor.model.Agricultor;
import com.agricultor_service.agricultor.repository.AgricultorRepository;
import com.agricultor_service.agricultor.repository.TransporteRepository;
import com.agricultor_service.agricultor.repository.TransportistaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgricultorService {

    private final AgricultorRepository agricultorRepository;
    private final TransporteRepository transporteRepository;
    private final TransportistaRepository transportistaRepository;

    public AgricultorService(
            AgricultorRepository agricultorRepository,
            TransporteRepository transporteRepository,
            TransportistaRepository transportistaRepository
    ) {
        this.agricultorRepository = agricultorRepository;
        this.transporteRepository = transporteRepository;
        this.transportistaRepository = transportistaRepository;
    }

    public List<AgricultorDetalleResponse> listar(String nit) {
        List<Agricultor> agricultores;

        if (nit != null && !nit.isBlank()) {
            agricultores = agricultorRepository.findByNitContainingIgnoreCase(nit.trim());
        } else {
            agricultores = agricultorRepository.findAll();
        }

        return agricultores.stream()
                .map(this::convertirARespuestaListado)
                .toList();
    }

    public AgricultorDetalleResponse obtenerDetalle(Long idAgricultor) {
        Agricultor agricultor = agricultorRepository.findById(idAgricultor)
                .orElseThrow(() -> new RuntimeException("Agricultor no encontrado"));

        AgricultorDetalleResponse response = convertirARespuestaListado(agricultor);

        Long cantidadTransportes =
                transporteRepository.countByAgricultor_IdAgricultor(idAgricultor);

        Long cantidadTransportistas =
                transportistaRepository.countByAgricultor_IdAgricultor(idAgricultor);

        response.setCantidadTransportes(cantidadTransportes);
        response.setCantidadTransportistas(cantidadTransportistas);

        /*
         * La cantidad de cuentas se calculará desde Angular usando:
         * GET /api/cuentas/agricultor/{idAgricultor}
         */
        response.setCantidadCuentas(null);

        return response;
    }

    private AgricultorDetalleResponse convertirARespuestaListado(Agricultor agricultor) {
        AgricultorDetalleResponse response = new AgricultorDetalleResponse();

        response.setIdAgricultor(agricultor.getIdAgricultor());
        response.setNit(agricultor.getNit());
        response.setNombre(agricultor.getNombre());
        response.setDireccion(agricultor.getDireccion());
        response.setTelefono(agricultor.getTelefono());
        response.setFechaCreacion(agricultor.getFechaCreacion());

        /*
         * El modelo Agricultor no tiene columna observaciones.
         * Se devuelve "-" para cumplir el caso de uso en la tabla.
         */
        response.setObservaciones("-");

        response.setCantidadCuentas(null);
        response.setCantidadTransportes(null);
        response.setCantidadTransportistas(null);

        return response;
    }
}