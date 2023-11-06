package com.ubt.andi.ecommerceapi.repositories;

import com.ubt.andi.ecommerceapi.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
