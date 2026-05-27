package com.agricultor_service.agricultor.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "pesaje", schema = "agricultor")
public class Pesaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pesaje")
    private Long idPesaje;

    @Column(name = "id_cuenta", nullable = false)
    private Long idCuenta;

    @ManyToOne
    @JoinColumn(name = "id_agricultor", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Agricultor agricultor;

    @Column(name = "cantidad_parcialidades")
    private Integer cantidadParcialidades;

    @ManyToOne
    @JoinColumn(name = "estado")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private DetalleCatalogo estado;

    @ManyToOne
    @JoinColumn(name = "medida")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private DetalleCatalogo medida;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "peso_total_actual")
    private Double pesoTotalActual;

    @Column(name = "observaciones")
    private String observaciones;
}