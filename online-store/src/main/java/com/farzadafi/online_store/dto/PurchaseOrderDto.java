package com.farzadafi.online_store.dto;

public record PurchaseOrderDto(String id,
                               String productId,
                               String productName,
                               Long productPrice) {
}
