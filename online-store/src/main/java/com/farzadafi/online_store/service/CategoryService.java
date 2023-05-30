package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public record CategoryService(CategoryRepository categoryRepository) {

    public void addCategory(Category category) {
        category.setId(UUID.randomUUID().toString());
        if (categoryRepository.findByName(category.getName()).block() != null)
            throw new DuplicateException("این نام از قبل موجود میباشید");
        categoryRepository.save(category).subscribe();
    }

    public Category findById(String id) {
        var categoryMono = categoryRepository.findById(id)
                .switchIfEmpty(Mono.error(
                        new NotFoundException(String.format("دسته بندی با این آیدی پیدا نشد %s", id))));
        return categoryMono.block();
    }
}
