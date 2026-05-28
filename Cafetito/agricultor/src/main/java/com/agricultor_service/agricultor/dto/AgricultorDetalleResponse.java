package com.agricultor_service.agricultor.dto;

import java.time.LocalDateTime;

public class AgricultorDetalleResponse {

    private Long idAgricultor;
    private String nit;
    private String nombre;
    private String direccion;
    private String telefono;
    private String observaciones;
    private LocalDateTime fechaCreacion;

    private Long cantidadCuentas;
    private Long cantidadTransportes;
    private Long cantidadTransportistas;

    public AgricultorDetalleResponse() {
    }

    public Long getIdAgricultor() {
        return idAgricultor;
    }

    public void setIdAgricultor(Long idAgricultor) {
        this.idAgricultor = idAgricultor;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Long getCantidadCuentas() {
        return cantidadCuentas;
    }

    public void setCantidadCuentas(Long cantidadCuentas) {
        this.cantidadCuentas = cantidadCuentas;
    }

    public Long getCantidadTransportes() {
        return cantidadTransportes;
    }

    public void setCantidadTransportes(Long cantidadTransportes) {
        this.cantidadTransportes = cantidadTransportes;
    }

    public Long getCantidadTransportistas() {
        return cantidadTransportistas;
    }

    public void setCantidadTransportistas(Long cantidadTransportistas) {
        this.cantidadTransportistas = cantidadTransportistas;
    }
}