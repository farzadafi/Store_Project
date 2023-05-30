package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public record CategoryService(CategoryRepository categoryRepository) {

    public void addCategory(Category category) {
        category.setId(UUID.randomUUID().toString());
        if(categoryRepository.findByName(category.getName()).block() != null)
            throw new DuplicateException("این نام از قبل موجود میباشید");
        categoryRepository.save(category).subscribe();
    }
}
