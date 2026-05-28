package com.agricultor_service.agricultor.service;

import com.agricultor_service.agricultor.dto.CuentaBeneficioRequest;
import com.agricultor_service.agricultor.dto.CuentaBeneficioResponse;
import com.agricultor_service.agricultor.dto.ParcialidadBeneficioRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class BeneficioClientService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String CUENTAS_URL =
            "http://beneficio-service:8083/api/cuentas/interno";

    private final String PARCIALIDADES_URL =
            "http://beneficio-service:8083/api/parcialidades/interno";

    public void crearCuentaEnBeneficio(CuentaBeneficioRequest request) {
        restTemplate.postForObject(CUENTAS_URL, request, Object.class);
    }

    public CuentaBeneficioResponse obtenerCuenta(Long idCuenta) {
        return restTemplate.getForObject(
                CUENTAS_URL + "/" + idCuenta,
                CuentaBeneficioResponse.class
        );
    }

    public List<CuentaBeneficioResponse> listarCuentasPorAgricultor(Long idAgricultor) {
        CuentaBeneficioResponse[] cuentas = restTemplate.getForObject(
                CUENTAS_URL + "/agricultor/" + idAgricultor,
                CuentaBeneficioResponse[].class
        );

        return cuentas == null ? List.of() : Arrays.asList(cuentas);
    }

    public void marcarCuentaPesajeIniciado(Long idCuenta) {
        restTemplate.put(
                CUENTAS_URL + "/" + idCuenta + "/iniciar-pesaje",
                null
        );
    }

    public void marcarCuentaPesajeFinalizado(Long idCuenta) {
        restTemplate.put(
                CUENTAS_URL + "/" + idCuenta + "/finalizar-pesaje",
                null
        );
    }

    public void registrarParcialidadEnBeneficio(ParcialidadBeneficioRequest request) {
        restTemplate.postForObject(
                PARCIALIDADES_URL,
                request,
                Object.class
        );
    }
}