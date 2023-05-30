package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.ProductDto;
import com.farzadafi.online_store.model.Product;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ProductMapper {

    public Product dtoToModel(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.name());
        product.setPrice(productDto.price());
        product.setQuantity(productDto.quantity());
        product.setBrand(productDto.brand());
        product.setDescription(productDto.description());
        product.setRate(productDto.rate());
        product.setSubCategoryId(productDto.subCategoryId());
        try {
            product.setImage(productDto.image().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return product;
    }
}
