package com.farzadafi.online_store.dto;

public record ProductDtoResponse(String id,
                                 String name,
                                 Long price,
                                 Integer quantity,
                                 String description,
                                 Integer rate,
                                 String image,
                                 String subCategoryId) {
}

