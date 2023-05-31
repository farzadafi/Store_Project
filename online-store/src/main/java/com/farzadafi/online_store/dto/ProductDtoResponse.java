package com.farzadafi.online_store.dto;

public record ProductDtoResponse(String id,
                                 String name,
                                 Long price,
                                 Integer quantity,
                                 String brand,
                                 String description,
                                 Integer rate,
                                 byte[] image,
                                 String subCategoryId) {
}

