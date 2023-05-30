package com.farzadafi.online_store.dto;

import org.bson.types.Binary;

public record ProductDto(String id,
                         String name,
                         Long Price,
                         Integer quantity,
                         String brand,
                         String description,
                         Integer rate,
                         Binary image,
                         String subCategoryId) {
}
