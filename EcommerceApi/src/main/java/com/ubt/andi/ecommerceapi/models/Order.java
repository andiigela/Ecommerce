package com.ubt.andi.ecommerceapi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;
    @Column(name = "total_quantity")
    private Integer totalQuantity;
    @Column(name = "total_price")
    private BigDecimal totalPrice;
    @Column(name = "status")
    private String status;
    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;
    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();
    public void add(OrderItem item){
        if(item != null){
            orderItems.add(item);
            item.setOrder(this);
        }
    }
}
