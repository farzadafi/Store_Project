package com.farzadafi.online_store.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class SubCategory {
    @Id
    @GeneratedValue
    private String id;

    private String name;

    private String categoryId;

    private Set<Product> subCategories = new HashSet<>();

    public void addProduct(Product product) {
        this.subCategories.add(product);
    }

    public void removeProduct(Product product) {
        this.subCategories.remove(product);
    }
}
