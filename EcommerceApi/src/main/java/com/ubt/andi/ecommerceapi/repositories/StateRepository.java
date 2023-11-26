package com.ubt.andi.ecommerceapi.repositories;

import com.ubt.andi.ecommerceapi.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Long> {
    List<State> findByCountryCode(@Param("code") String code);
    List<State> findAllByCountryName(String name);
    List<State> deleteStateByCountry_Name(String name);
}
