package com.Beneficio.Beneficio.controller;

import com.Beneficio.Beneficio.model.ParcialidadBeneficio;
import com.Beneficio.Beneficio.service.ParcialidadBeneficioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parcialidades")
@RequiredArgsConstructor
public class ParcialidadBeneficioController {

    private final ParcialidadBeneficioService parcialidadService;

    @GetMapping("/cuenta/{idCuenta}")
    public ResponseEntity<List<ParcialidadBeneficio>> listar(@PathVariable Long idCuenta) {
        return ResponseEntity.ok(parcialidadService.listarPorCuenta(idCuenta));
    }

    @PostMapping("/interno")
    public ResponseEntity<?> registrarDesdeMicroAgricultor(
            @RequestBody ParcialidadBeneficio parcialidad
    ) {
        try {
            return ResponseEntity.ok(
                    parcialidadService.registrarDesdeMicroAgricultor(
                            parcialidad,
                            "micro-agricultor"
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{idParcialidad}/recibir")
    public ResponseEntity<?> recibirDesdeBeneficio(
            @PathVariable Long idParcialidad,
            @AuthenticationPrincipal UserDetails user
    ) {
        try {
            String usuario = user != null ? user.getUsername() : "beneficio";

            return ResponseEntity.ok(
                    parcialidadService.recibirDesdeBeneficio(
                            idParcialidad,
                            usuario
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{idParcialidad}/rechazar")
    public ResponseEntity<?> rechazarDesdeBeneficio(
            @PathVariable Long idParcialidad,
            @AuthenticationPrincipal UserDetails user
    ) {
        try {
            String usuario = user != null ? user.getUsername() : "beneficio";

            return ResponseEntity.ok(
                    parcialidadService.rechazarDesdeBeneficio(
                            idParcialidad,
                            usuario
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}