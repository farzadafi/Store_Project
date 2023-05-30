package com.farzadafi.online_store.dto;

import org.springframework.web.multipart.MultipartFile;

public record ProductDto(String id,
                         String name,
                         Long price,
                         Integer quantity,
                         String brand,
                         String description,
                         Integer rate,
                         MultipartFile image,
                         String subCategoryId) {}
