package com.farzadafi.online_store.dto;

import com.farzadafi.online_store.model.Product;

import java.time.LocalDateTime;
import java.util.Set;

public record OrdersDtoResponse(String id,
                                String customerName,
                                String address,
                                String phoneNumber,
                                boolean isDeliver,
                                LocalDateTime deliverTime,
                                LocalDateTime orderTime,
                                Long totalPrice,
                                Set<Product> products) {
}
