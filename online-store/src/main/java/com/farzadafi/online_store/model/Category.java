package com.farzadafi.online_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class Category {
    @Id
    @GeneratedValue
    private String id;

    @Indexed(unique = true)
    private String name;

    private Set<SubCategory> subCategories = new HashSet<>();

    public void addSubCategory(SubCategory subCategory) {
        this.subCategories.add(subCategory);
    }
}
