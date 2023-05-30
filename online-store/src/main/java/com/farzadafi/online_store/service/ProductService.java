package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.model.Product;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public record ProductService(SubCategoryService subCategoryService,
                             ProductRepository productRepository) {

    public void addProduct(Product product) {
        SubCategory subCategory = subCategoryService.findById(product.getSubCategoryId());
        if (productRepository.findByName(product.getName()).block() != null)
            throw new DuplicateException("این نام از قبل موجود میباشید");
        product.setId(UUID.randomUUID().toString());
        subCategory.addProduct(product);
        subCategoryService.updateSubCategory(subCategory);
        productRepository.save(product).subscribe();
    }
}
