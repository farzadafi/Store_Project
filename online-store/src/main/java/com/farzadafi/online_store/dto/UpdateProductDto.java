package com.farzadafi.online_store.dto;

public record UpdateProductDto(String id,
                               Long Price,
                               Integer quantity) {
}
