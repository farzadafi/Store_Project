package com.farzadafi.online_store.repository;

import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.model.SubCategory;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SubCategoryRepository extends ReactiveMongoRepository<SubCategory, String> {
    Mono<Category> findByName(String name);
}
