package com.ubt.andi.ecommerceapi.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ubt.andi.ecommerceapi.dto.PaymentInfo;
import com.ubt.andi.ecommerceapi.dto.Purchase;
import com.ubt.andi.ecommerceapi.dto.PurchaseResponse;
import com.ubt.andi.ecommerceapi.services.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController

public class CheckoutController {
    private final CustomerService customerService;
    public CheckoutController(CustomerService customerService){
        this.customerService=customerService;
    }
    @PostMapping("/checkout/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = customerService.placeOrder(purchase);
        return purchaseResponse;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {
        PaymentIntent paymentIntent = customerService.createPaymentIntent(paymentInfo);
        String paymentString = paymentIntent.toJson();
        return new ResponseEntity<>(paymentString, HttpStatus.OK);
    }
}
