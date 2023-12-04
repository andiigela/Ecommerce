package com.ubt.andi.ecommerceapi.controllers;

import com.ubt.andi.ecommerceapi.dto.Purchase;
import com.ubt.andi.ecommerceapi.dto.PurchaseResponse;
import com.ubt.andi.ecommerceapi.services.CustomerService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CustomerService customerService;
    public CheckoutController(CustomerService customerService){
        this.customerService=customerService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = customerService.placeOrder(purchase);
        return purchaseResponse;
    }
}
