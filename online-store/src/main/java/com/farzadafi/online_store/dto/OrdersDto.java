package com.farzadafi.online_store.dto;

import com.farzadafi.online_store.model.PurchaseOrder;

import java.util.Set;

public record OrdersDto(String id,
                        String customerName,
                        String address,
                        String phoneNumber,
                        Long totalPrice,
                        Set<PurchaseOrder> purchaseOrders) {
}
