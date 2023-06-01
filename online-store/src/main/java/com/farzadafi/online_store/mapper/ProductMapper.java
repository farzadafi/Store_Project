package com.farzadafi.online_store.mapper;

import com.farzadafi.online_store.dto.ProductDto;
import com.farzadafi.online_store.dto.ProductDtoResponse;
import com.farzadafi.online_store.model.Product;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class ProductMapper {

    public static Product dtoToModel(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.name());
        product.setPrice(productDto.price());
        product.setQuantity(productDto.quantity());
        product.setBrand(productDto.brand());
        product.setDescription(productDto.description());
        product.setRate(productDto.rate());
        product.setSubCategoryId(productDto.subCategoryId());
        try {
            byte[] bytes = productDto.image().getBytes();
            String base64Encoded = Base64.getEncoder().encodeToString(bytes);
            product.setImage(base64Encoded);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return product;
    }

    public static ProductDtoResponse modelToDto(Product product) {
        return new ProductDtoResponse(product.getId(),
                product.getName(),
                product.getPrice(),
                product.getQuantity(),
                product.getBrand(),
                product.getDescription(),
                product.getRate(),
                product.getImage(),
                product.getSubCategoryId());
    }

    public static List<ProductDtoResponse> modelsToDtos(List<Product> productList) {
        List<ProductDtoResponse> productDtoList = new ArrayList<>();
        for (Product e : productList
        ) {
            productDtoList.add(modelToDto(e));
        }
        return productDtoList;
    }
}
