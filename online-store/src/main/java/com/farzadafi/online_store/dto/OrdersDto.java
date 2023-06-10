package com.farzadafi.online_store.dto;

import com.farzadafi.online_store.model.Product;

import java.util.Set;

public record OrdersDto(String id,
                        String customerName,
                        String address,
                        String phoneNumber,
                        Long totalPrice,
                        Set<Product> products) {
}
