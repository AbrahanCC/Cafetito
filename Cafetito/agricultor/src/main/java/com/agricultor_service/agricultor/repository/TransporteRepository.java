package com.agricultor_service.agricultor.repository;

import com.agricultor_service.agricultor.model.Transporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransporteRepository extends JpaRepository<Transporte, Long> {

    List<Transporte> findByAgricultor_IdAgricultor(Long idAgricultor);

    boolean existsByPlaca(String placa);

    List<Transporte> findByAgricultor_IdAgricultorAndDisponibleTrue(Long idAgricultor);

    Optional<Transporte> findByPlaca(String placa);

    Long countByAgricultor_IdAgricultor(Long idAgricultor);
}