package com.ubt.andi.ecommerceapi.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String sku;
    private String name;
    private String description;
    @Column(name = "unit_price")
    private BigDecimal price;
    @Column(name = "image_url")
    private String imageUrl;
    private boolean active;
    @Column(name = "units_in_stock")
    private Integer unitsInStock;
    @CreationTimestamp
    @Column(name = "date_created")
    private Date dateCreated;
    @UpdateTimestamp
    @Column(name = "last_updated")
    private Date lastUpdated;
    @ManyToOne
    @JoinColumn(nullable = false)
    private ProductCategory productCategory;




}
