package com.farzadafi.online_store.service;

import com.farzadafi.online_store.dto.UpdateProductDto;
import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.Product;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.repository.ProductRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
            Flux<Product> allBySubCategoryId = productRepository.findAllBySubCategoryId(subCategoryId)
                    .switchIfEmpty(Mono.error(new NotFoundException("No products found")));
            return allBySubCategoryId.collectList().block();
        }
        return null;
    }

    public List<Product> findAllProduct() {
        Flux<Product> allProduct = productRepository.findAll()
                .switchIfEmpty(Mono.error(new NotFoundException("No product found")));
        return allProduct.collectList().block();
    }

    public Product findById(String id) {
        Mono<Product> productFound = productRepository.findById(id)
                .switchIfEmpty(Mono.error(new NotFoundException("No Product found")));
        return productFound.block();
    }

    public void removeProduct(String id) {
        Product product = findById(id);
        SubCategory subCategory = subCategoryService.findById(product.getSubCategoryId());
        subCategory.removeProduct(product);
        subCategoryService.updateSubCategory(subCategory);
        productRepository.delete(product).subscribe();
    }

    public void update(ArrayList<UpdateProductDto> updateProductDtos) {
        List<Product> products = getProducts(updateProductDtos);
        updateInProducts(updateProductDtos, products);
        updateInSubCategory(products);
    }

    private List<Product> getProducts(ArrayList<UpdateProductDto> updateProductDtos) {
        List<Product> products = new ArrayList<>();
        updateProductDtos.forEach(p -> {
            Product product = findById(p.id());
            products.add(product);
        });
        return products;
    }

    private void updateInProducts(ArrayList<UpdateProductDto> updateProductDtos, List<Product> products) {
        products.forEach(p -> {
            UpdateProductDto updateProduct = updateProductDtos.
                    stream()
                    .filter(updateProductDto ->
                            p.getId().equals(updateProductDto.id())).findFirst().get();

            p.setPrice(updateProduct.price() != null ? updateProduct.price() : p.getPrice());
            p.setQuantity(updateProduct.quantity() != null ? updateProduct.quantity() : p.getQuantity());
            productRepository.save(p).subscribe();
        });
    }

    private void updateInSubCategory(List<Product> products) {
        List<SubCategory> allSubCategory = subCategoryService.findAllSubCategory();
        for (SubCategory subCategory : allSubCategory) {
            for (Product product : subCategory.getSubCategories()) {
                Optional<Product> matchingProduct = products.stream()
                        .filter(p -> p.getId().equals(product.getId()))
                        .findFirst();
                if (matchingProduct.isPresent()) {
                    product.setPrice(matchingProduct.get().getPrice());
                    product.setQuantity(matchingProduct.get().getQuantity());
                }
                subCategoryService.updateSubCategory(subCategory);
            }
        }
    }
}
