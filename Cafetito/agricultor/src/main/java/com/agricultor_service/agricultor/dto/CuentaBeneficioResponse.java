package com.agricultor_service.agricultor.dto;

public class CuentaBeneficioResponse {

    private Long idCuenta;
    private Long nitAgricultor;
    private Double pesoObjetivo;
    private Double pesoAcumulado;
    private Double saldoPendiente;
    private Integer cantidadParcialidades;
    private String estado;

    public CuentaBeneficioResponse() {
    }

    public Long getIdCuenta() {
        return idCuenta;
    }

    public void setIdCuenta(Long idCuenta) {
        this.idCuenta = idCuenta;
    }

    public Long getNitAgricultor() {
        return nitAgricultor;
    }

    public void setNitAgricultor(Long nitAgricultor) {
        this.nitAgricultor = nitAgricultor;
    }

    public Double getPesoObjetivo() {
        return pesoObjetivo;
    }

    public void setPesoObjetivo(Double pesoObjetivo) {
        this.pesoObjetivo = pesoObjetivo;
    }

    public Double getPesoAcumulado() {
        return pesoAcumulado;
    }

    public void setPesoAcumulado(Double pesoAcumulado) {
        this.pesoAcumulado = pesoAcumulado;
    }

    public Double getSaldoPendiente() {
        return saldoPendiente;
    }

    public void setSaldoPendiente(Double saldoPendiente) {
        this.saldoPendiente = saldoPendiente;
    }

    public Integer getCantidadParcialidades() {
        return cantidadParcialidades;
    }

    public void setCantidadParcialidades(Integer cantidadParcialidades) {
        this.cantidadParcialidades = cantidadParcialidades;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}