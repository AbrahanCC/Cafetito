package com.agricultor_service.agricultor.controller;

import com.agricultor_service.agricultor.dto.AgricultorDetalleResponse;
import com.agricultor_service.agricultor.service.AgricultorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agricultor/agricultores")
public class AgricultorController {

    private final AgricultorService agricultorService;

    public AgricultorController(AgricultorService agricultorService) {
        this.agricultorService = agricultorService;
    }

    @GetMapping
    public ResponseEntity<?> listar(
            @RequestParam(required = false) String nit
    ) {
        try {
            List<AgricultorDetalleResponse> agricultores =
                    agricultorService.listar(nit);

            return ResponseEntity.ok(agricultores);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{idAgricultor}/detalle")
    public ResponseEntity<?> obtenerDetalle(
            @PathVariable Long idAgricultor
    ) {
        try {
            AgricultorDetalleResponse detalle =
                    agricultorService.obtenerDetalle(idAgricultor);

            return ResponseEntity.ok(detalle);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}