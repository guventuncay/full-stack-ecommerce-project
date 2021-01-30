package com.guvenx.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

    // you can use @NonNull instead of final
    private final String orderTrackingNumber;


}
