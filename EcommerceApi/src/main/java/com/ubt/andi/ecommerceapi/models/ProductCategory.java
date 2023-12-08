package com.ubt.andi.ecommerceapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "productCategory",fetch = FetchType.LAZY)
    private List<Product> products = new ArrayList<>();
}
