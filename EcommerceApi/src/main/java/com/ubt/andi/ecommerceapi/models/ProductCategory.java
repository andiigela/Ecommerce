package com.ubt.andi.ecommerceapi.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product_category")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "category_name")
    private String name;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "productCategory")
    private List<Product> products = new ArrayList<>();
}
