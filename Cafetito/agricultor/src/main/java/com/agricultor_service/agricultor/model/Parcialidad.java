package com.agricultor_service.agricultor.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "parcialidad", schema = "agricultor")
public class Parcialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_parcialidad")
    private Long idParcialidad;

    @ManyToOne
    @JoinColumn(name = "id_pesaje", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Pesaje pesaje;

    @Column(name = "id_cuenta", nullable = false)
    private Long idCuenta;

    @Column(name = "placa", nullable = false)
    private String placa;

    @Column(name = "id_transportista", nullable = false)
    private Long idTransportista;

    @ManyToOne
    @JoinColumn(name = "estado")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private DetalleCatalogo estado;

    @Column(name = "peso_actual")
    private Double pesoActual;

    @Column(name = "diferencia_peso")
    private Double diferenciaPeso;

    @Column(name = "fecha_recepcion")
    private LocalDate fechaRecepcion;

    @Column(name = "hora_recepcion")
    private LocalTime horaRecepcion;

    @Column(name = "observaciones")
    private String observaciones;
}