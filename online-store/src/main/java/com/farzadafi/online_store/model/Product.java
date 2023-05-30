package com.farzadafi.online_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.Binary;
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

    private String brand;

    private String description;

    private Integer rate;

    private Binary image;

    private String subCategoryId;
}
