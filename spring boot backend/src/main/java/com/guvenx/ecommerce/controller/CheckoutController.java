package com.guvenx.ecommerce.controller;

import com.guvenx.ecommerce.dto.Purchase;
import com.guvenx.ecommerce.dto.PurchaseResponse;
import com.guvenx.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = this.checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}
