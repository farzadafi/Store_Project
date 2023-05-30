package com.farzadafi.online_store.repository;

import com.farzadafi.online_store.model.Category;
import com.farzadafi.online_store.model.Product;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ProductRepository extends ReactiveMongoRepository<Product, String> {
    Mono<Category> findByName(String name);
}
