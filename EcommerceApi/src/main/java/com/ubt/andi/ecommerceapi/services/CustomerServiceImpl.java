package com.ubt.andi.ecommerceapi.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ubt.andi.ecommerceapi.dto.PaymentInfo;
import com.ubt.andi.ecommerceapi.dto.Purchase;
import com.ubt.andi.ecommerceapi.dto.PurchaseResponse;
import com.ubt.andi.ecommerceapi.models.Customer;
import com.ubt.andi.ecommerceapi.models.Order;
import com.ubt.andi.ecommerceapi.models.OrderItem;
import com.ubt.andi.ecommerceapi.repositories.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    public CustomerServiceImpl(CustomerRepository customerRepository,@Value("${stripe.key.secret}") String secretKey){
        this.customerRepository=customerRepository;
        Stripe.apiKey=secretKey;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        List<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        Customer customerDb = customerRepository.findByEmail(customer.getEmail());
        if(customerDb != null ){
            customer = customerDb;
        }
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");
        Map<String, Object> params = new HashMap<>();
        params.put("amount",paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);
        return PaymentIntent.create(params);
    }

    public String generateOrderTrackingNumber(){
        return UUID.randomUUID().toString();
    }
}
