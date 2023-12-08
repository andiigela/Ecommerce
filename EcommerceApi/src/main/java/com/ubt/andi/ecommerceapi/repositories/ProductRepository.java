package com.ubt.andi.ecommerceapi.repositories;

import com.ubt.andi.ecommerceapi.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByProductCategoryId(@Param("id") Long id,Pageable Page);
    Product findProductBySku(String sku);
    Page<Product> findByNameContaining(@Param("name") String name, Pageable page);
}
