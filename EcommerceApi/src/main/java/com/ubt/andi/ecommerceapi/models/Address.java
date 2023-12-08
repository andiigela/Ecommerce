package com.ubt.andi.ecommerceapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name="street")
    private String street;
    @Column(name="city")
    private String city;
    @Column(name="state")
    private String state;
    @Column(name="country")
    private String country;
    @Column(name="zip_code")
    private String zipCode;
    @OneToOne()
    @PrimaryKeyJoinColumn
    private Order order;
}
