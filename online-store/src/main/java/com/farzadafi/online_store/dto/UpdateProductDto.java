package com.farzadafi.online_store.dto;

public record UpdateProductDto(String id,
                               Long price,
                               Integer quantity) {
}
