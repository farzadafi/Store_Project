package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.model.Product;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;
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

    public List<Product> findAllBySubCategoryId(String subCategoryId) {
        if (subCategoryService.findById(subCategoryId) != null) {
            Flux<Product> allBySubCategoryId = productRepository.findAllBySubCategoryId(subCategoryId);
            return allBySubCategoryId.collectList().block();
        }
        return null;
    }
}
