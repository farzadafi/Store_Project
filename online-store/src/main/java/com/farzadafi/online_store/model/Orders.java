package com.farzadafi.online_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class Orders {
    @Id
    @GeneratedValue
    private String id;

    private String customerName;

    private String address;

    private String phoneNumber;

    private boolean isDeliver;

    private LocalDateTime deliverTime;

    @CreatedDate
    private LocalDateTime orderTime;

    private Long totalPrice;

    private Set<Product> products = new HashSet<>();
}
