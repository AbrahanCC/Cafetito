package com.Beneficio.Beneficio.repository;

import com.Beneficio.Beneficio.model.ParcialidadBeneficio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParcialidadBeneficioRepository extends JpaRepository<ParcialidadBeneficio, Long> {

    List<ParcialidadBeneficio> findByCuenta_IdCuenta(Long idCuenta);

    List<ParcialidadBeneficio> findByEstado(String estado);

    List<ParcialidadBeneficio> findByEstadoAndCuenta_EstadoIn(
            String estado,
            List<String> estadosCuenta
    );

    List<ParcialidadBeneficio> findByBoletaTrue();

    boolean existsByIdParcialidadAgricultor(Long idParcialidadAgricultor);
}