package com.agricultor_service.agricultor.controller;

import com.agricultor_service.agricultor.model.Pesaje;
import com.agricultor_service.agricultor.service.PesajeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agricultor/pesajes")
public class PesajeController {

    private final PesajeService pesajeService;

    public PesajeController(PesajeService pesajeService) {
        this.pesajeService = pesajeService;
    }

    @GetMapping
    public ResponseEntity<?> listar(HttpServletRequest request) {

        try {

            Long idAgricultor =
                    (Long) request.getAttribute("idAgricultor");

            List<Pesaje> pesajes =
                    pesajeService.listarPorAgricultor(
                            idAgricultor
                    );

            return ResponseEntity.ok(pesajes);

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

    @GetMapping("/{idPesaje}")
    public ResponseEntity<?> obtener(@PathVariable Long idPesaje) {

        try {

            Pesaje pesaje =
                    pesajeService.obtenerPorId(
                            idPesaje
                    );

            return ResponseEntity.ok(pesaje);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(
            @RequestBody Pesaje pesaje,
            HttpServletRequest request
    ) {

        try {

            Long idAgricultor =
                    (Long) request.getAttribute("idAgricultor");

            Pesaje nuevo =
                    pesajeService.crear(
                            idAgricultor,
                            pesaje
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(nuevo);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{idPesaje}/finalizar")
    public ResponseEntity<?> finalizar(@PathVariable Long idPesaje) {

        try {

            Pesaje pesaje =
                    pesajeService.finalizar(
                            idPesaje
                    );

            return ResponseEntity.ok(pesaje);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}