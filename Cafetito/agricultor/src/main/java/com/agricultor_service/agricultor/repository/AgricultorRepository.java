package com.agricultor_service.agricultor.repository;

import com.agricultor_service.agricultor.model.Agricultor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgricultorRepository extends JpaRepository<Agricultor, Long> {

    List<Agricultor> findByNitContainingIgnoreCase(String nit);
}