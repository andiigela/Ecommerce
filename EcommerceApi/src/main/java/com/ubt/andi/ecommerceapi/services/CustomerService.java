package com.ubt.andi.ecommerceapi.services;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ubt.andi.ecommerceapi.dto.PaymentInfo;
import com.ubt.andi.ecommerceapi.dto.Purchase;
import com.ubt.andi.ecommerceapi.dto.PurchaseResponse;

public interface CustomerService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
