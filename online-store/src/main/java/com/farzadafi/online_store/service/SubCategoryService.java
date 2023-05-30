package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.model.SubCategory;
import com.farzadafi.online_store.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public record SubCategoryService(SubCategoryRepository subCategoryRepository,
                                 CategoryService categoryService) {

    public void addSubCategory(String categoryId, SubCategory subCategory) {
        Category category = categoryService.findById(categoryId);
        if(subCategoryRepository.findByName(subCategory.getName()).block() != null)
            throw new DuplicateException("این نام از قبل موجود میباشید");
        subCategory.setId(UUID.randomUUID().toString());
        subCategory.setCategory(category);
        subCategoryRepository.save(subCategory).subscribe();
    }
}
