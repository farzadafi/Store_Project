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
public class Product {
    @Id
    @GeneratedValue
    private String id;

    private String name;

    private Long price;

    private Integer quantity;

    private String description;

    private Integer rate;

    private String image;

    private String subCategoryId;
}
