package com.farzadafi.online_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class PurchaseOrder {
    @Id
    @GeneratedValue
    private String id;

    private String productId;

    private String productName;

    private Long productPrice;
}
