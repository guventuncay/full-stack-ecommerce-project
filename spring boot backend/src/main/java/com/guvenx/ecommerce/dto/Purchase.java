package com.guvenx.ecommerce.dto;

import com.guvenx.ecommerce.entity.Address;
import com.guvenx.ecommerce.entity.Customer;
import com.guvenx.ecommerce.entity.Order;
import com.guvenx.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
