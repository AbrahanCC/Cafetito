package com.Beneficio.Beneficio.controller;

import com.Beneficio.Beneficio.dto.CambioEstadoRequest;
import com.Beneficio.Beneficio.model.Cuenta;
import com.Beneficio.Beneficio.service.CuentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cuentas")
@RequiredArgsConstructor
public class CuentaController {

    private final CuentaService cuentaService;

    @GetMapping
    public ResponseEntity<List<Cuenta>> listar() {
        return ResponseEntity.ok(cuentaService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cuenta> obtener(@PathVariable Long id) {
        return cuentaService.obtener(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/agricultor/{nitAgricultor}")
    public ResponseEntity<List<Cuenta>> listarPorAgricultor(@PathVariable Long nitAgricultor) {
        return ResponseEntity.ok(cuentaService.listarPorAgricultor(nitAgricultor));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Cuenta>> listarPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(cuentaService.listarPorEstado(estado));
    }

    @GetMapping("/peso-cabal")
    public ResponseEntity<List<Cuenta>> listarParaPesoCabal() {

        return ResponseEntity.ok(
                cuentaService.listarCuentasParaPesoCabal()
        );
    }

    @GetMapping("/cerradas")
    public ResponseEntity<List<Cuenta>> listarCerradas() {

        return ResponseEntity.ok(
                cuentaService.listarCuentasCerradas()
        );
    }

    @GetMapping("/confirmadas")
    public ResponseEntity<List<Cuenta>> listarConfirmadas() {

        return ResponseEntity.ok(
                cuentaService.listarCuentasConfirmadas()
        );
    }

    @PostMapping("/interno")
    public ResponseEntity<Cuenta> crearDesdeMicroAgricultor(@RequestBody Cuenta cuenta) {
        return ResponseEntity.ok(
                cuentaService.crear(cuenta, "micro-agricultor")
        );
    }

    @PostMapping
    public ResponseEntity<Cuenta> crear(@RequestBody Cuenta cuenta,
                                        @AuthenticationPrincipal UserDetails user) {

        String usuario = user != null ? user.getUsername() : "sistema";

        return ResponseEntity.ok(
                cuentaService.crear(cuenta, usuario)
        );
    }

    @PutMapping("/interno/{id}/iniciar-pesaje")
    public ResponseEntity<Cuenta> iniciarPesajeInterno(@PathVariable Long id) {
        return ResponseEntity.ok(
                cuentaService.marcarPesajeIniciado(
                        id,
                        "micro-agricultor"
                )
        );
    }

    @PutMapping("/interno/{id}/finalizar-pesaje")
    public ResponseEntity<Cuenta> finalizarPesajeInterno(@PathVariable Long id) {
        return ResponseEntity.ok(
                cuentaService.marcarPesajeFinalizado(
                        id,
                        "micro-agricultor"
                )
        );
    }


    @GetMapping("/interno/{id}")
    public ResponseEntity<Cuenta> obtenerInterno(@PathVariable Long id) {
        return cuentaService.obtener(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/interno/agricultor/{idAgricultor}")
    public ResponseEntity<List<Cuenta>> listarPorAgricultorInterno(@PathVariable Long idAgricultor) {
        return ResponseEntity.ok(
                cuentaService.listarPorAgricultor(idAgricultor)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> actualizar(@PathVariable Long id,
                                             @RequestBody Cuenta cuenta,
                                             @AuthenticationPrincipal UserDetails user) {

        String usuario = user != null ? user.getUsername() : "sistema";

        return ResponseEntity.ok(
                cuentaService.actualizar(id, cuenta, usuario)
        );
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Cuenta> cambiarEstado(@PathVariable Long id,
                                                @RequestBody CambioEstadoRequest request,
                                                @AuthenticationPrincipal UserDetails user) {

        String usuario = user != null ? user.getUsername() : "sistema";

        return ResponseEntity.ok(
                cuentaService.cambiarEstado(
                        id,
                        request.getNuevoEstado(),
                        request.getDiferenciaTotal(),
                        usuario
                )
        );
    }
}