package com.agricultor_service.agricultor.repository;

import com.agricultor_service.agricultor.model.Transportista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportistaRepository extends JpaRepository<Transportista, Long> {

    List<Transportista> findByAgricultor_IdAgricultor(Long idAgricultor);

    boolean existsByCui(String cui);

    List<Transportista> findByAgricultor_IdAgricultorAndDisponibleTrue(Long idAgricultor);

    Long countByAgricultor_IdAgricultor(Long idAgricultor);
}