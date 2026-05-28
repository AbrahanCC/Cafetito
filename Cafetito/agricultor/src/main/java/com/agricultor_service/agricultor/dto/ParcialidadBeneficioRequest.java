package com.agricultor_service.agricultor.dto;

public class ParcialidadBeneficioRequest {

    private CuentaRef cuenta;
    private Long idParcialidadAgricultor;
    private Long idPesajeAgricultor;
    private String placaTransporte;
    private Integer estadoTransporte;
    private String observacionTransporte;
    private String cuiTransportista;
    private String nombreTransportista;
    private Integer estadoTransportista;
    private String observacionTransportista;
    private Double pesoEnviado;
    private String tipoMedida;
    private String observaciones;

    public static class CuentaRef {
        private Long idCuenta;

        public CuentaRef() {
        }

        public CuentaRef(Long idCuenta) {
            this.idCuenta = idCuenta;
        }

        public Long getIdCuenta() {
            return idCuenta;
        }

        public void setIdCuenta(Long idCuenta) {
            this.idCuenta = idCuenta;
        }
    }

    public CuentaRef getCuenta() {
        return cuenta;
    }

    public void setCuenta(CuentaRef cuenta) {
        this.cuenta = cuenta;
    }

    public Long getIdParcialidadAgricultor() {
        return idParcialidadAgricultor;
    }

    public void setIdParcialidadAgricultor(Long idParcialidadAgricultor) {
        this.idParcialidadAgricultor = idParcialidadAgricultor;
    }

    public Long getIdPesajeAgricultor() {
        return idPesajeAgricultor;
    }

    public void setIdPesajeAgricultor(Long idPesajeAgricultor) {
        this.idPesajeAgricultor = idPesajeAgricultor;
    }

    public String getPlacaTransporte() {
        return placaTransporte;
    }

    public void setPlacaTransporte(String placaTransporte) {
        this.placaTransporte = placaTransporte;
    }

    public Integer getEstadoTransporte() {
        return estadoTransporte;
    }

    public void setEstadoTransporte(Integer estadoTransporte) {
        this.estadoTransporte = estadoTransporte;
    }

    public String getObservacionTransporte() {
        return observacionTransporte;
    }

    public void setObservacionTransporte(String observacionTransporte) {
        this.observacionTransporte = observacionTransporte;
    }

    public String getCuiTransportista() {
        return cuiTransportista;
    }

    public void setCuiTransportista(String cuiTransportista) {
        this.cuiTransportista = cuiTransportista;
    }

    public String getNombreTransportista() {
        return nombreTransportista;
    }

    public void setNombreTransportista(String nombreTransportista) {
        this.nombreTransportista = nombreTransportista;
    }

    public Integer getEstadoTransportista() {
        return estadoTransportista;
    }

    public void setEstadoTransportista(Integer estadoTransportista) {
        this.estadoTransportista = estadoTransportista;
    }

    public String getObservacionTransportista() {
        return observacionTransportista;
    }

    public void setObservacionTransportista(String observacionTransportista) {
        this.observacionTransportista = observacionTransportista;
    }

    public Double getPesoEnviado() {
        return pesoEnviado;
    }

    public void setPesoEnviado(Double pesoEnviado) {
        this.pesoEnviado = pesoEnviado;
    }

    public String getTipoMedida() {
        return tipoMedida;
    }

    public void setTipoMedida(String tipoMedida) {
        this.tipoMedida = tipoMedida;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}