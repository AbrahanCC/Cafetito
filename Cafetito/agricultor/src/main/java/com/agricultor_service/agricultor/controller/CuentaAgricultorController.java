package com.agricultor_service.agricultor.controller;

import com.agricultor_service.agricultor.dto.CuentaBeneficioResponse;
import com.agricultor_service.agricultor.service.BeneficioClientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agricultor/cuentas")
public class CuentaAgricultorController {

    private final BeneficioClientService beneficioClientService;

    public CuentaAgricultorController(BeneficioClientService beneficioClientService) {
        this.beneficioClientService = beneficioClientService;
    }

    @GetMapping
    public ResponseEntity<List<CuentaBeneficioResponse>> listarDisponibles(
            HttpServletRequest request
    ) {

        Long idAgricultor =
                (Long) request.getAttribute("idAgricultor");

        if (idAgricultor == null) {
            throw new RuntimeException(
                    "No se encontró el agricultor autenticado"
            );
        }

        List<CuentaBeneficioResponse> cuentas =
                beneficioClientService
                        .listarCuentasPorAgricultor(idAgricultor)
                        .stream()
                        .filter(c ->
                                "CUENTA_CREADA".equals(c.getEstado())
                                        || "PESAJE_INICIADO".equals(c.getEstado())
                        )
                        .toList();

        return ResponseEntity.ok(cuentas);
    }
}