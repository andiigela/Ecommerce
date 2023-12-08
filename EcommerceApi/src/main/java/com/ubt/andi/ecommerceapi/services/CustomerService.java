package com.ubt.andi.ecommerceapi.services;

import com.ubt.andi.ecommerceapi.dto.Purchase;
import com.ubt.andi.ecommerceapi.dto.PurchaseResponse;

public interface CustomerService {
    PurchaseResponse placeOrder(Purchase purchase);
}
