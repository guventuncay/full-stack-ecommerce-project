package com.guvenx.ecommerce.service;

import com.guvenx.ecommerce.dto.Purchase;
import com.guvenx.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
