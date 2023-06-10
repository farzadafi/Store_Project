package com.farzadafi.online_store.dto;

import com.farzadafi.online_store.model.PurchaseOrder;
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
                                Set<PurchaseOrder> purchaseOrders) {
}
