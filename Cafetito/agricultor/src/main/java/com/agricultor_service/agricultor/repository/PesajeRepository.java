package com.agricultor_service.agricultor.repository;

import com.agricultor_service.agricultor.model.Pesaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PesajeRepository extends JpaRepository<Pesaje, Long> {

    List<Pesaje> findByAgricultor_IdAgricultor(Long idAgricultor);

    List<Pesaje> findByIdCuenta(Long idCuenta);
}