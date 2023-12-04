package com.ubt.andi.ecommerceapi.dto;

import com.ubt.andi.ecommerceapi.models.Address;
import com.ubt.andi.ecommerceapi.models.Customer;
import com.ubt.andi.ecommerceapi.models.Order;
import com.ubt.andi.ecommerceapi.models.OrderItem;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private List<OrderItem> orderItems = new ArrayList<>();
}
