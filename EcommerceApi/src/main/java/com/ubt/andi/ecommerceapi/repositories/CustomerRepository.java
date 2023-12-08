package com.ubt.andi.ecommerceapi.repositories;

import com.ubt.andi.ecommerceapi.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {


}
