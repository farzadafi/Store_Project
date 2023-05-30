package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
public record SubCategoryService(SubCategoryRepository subCategoryRepository,
                                 CategoryService categoryService) {
    public void addSubCategory(String categoryId, SubCategory subCategory) {
        Category category = categoryService.findById(categoryId);
        if (subCategoryRepository.findByName(subCategory.getName()).block() != null)
            throw new DuplicateException("این نام از قبل موجود میباشید");
        subCategory.setId(UUID.randomUUID().toString());
        subCategory.setCategoryId(categoryId);
        category.addSubCategory(subCategory);
        categoryService.updateCategory(category);
        subCategoryRepository.save(subCategory).subscribe();
    }

    public void updateSubCategory(SubCategory subCategory) {
        subCategoryRepository.save(subCategory).subscribe();
    }

    public List<SubCategory> findAllByCategoryId(String categoryId) {
        if (categoryService.findById(categoryId) != null) {
            Flux<SubCategory> allByCategoryId = subCategoryRepository.findAllByCategoryId(categoryId);
            return allByCategoryId.collectList().block();
        }
        return null;
    }

    public SubCategory findById(String id) {
        var categoryMono = subCategoryRepository.findById(id)
                .switchIfEmpty(Mono.error(
                        new NotFoundException(String.format("دسته بندی با این آیدی پیدا نشد %s", id))));
        return categoryMono.block();
    }
}
