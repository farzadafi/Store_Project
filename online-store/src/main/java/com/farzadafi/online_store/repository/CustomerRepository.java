package com.farzadafi.online_store.repository;

import com.farzadafi.online_store.model.Customer;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface CustomerRepository extends ReactiveMongoRepository<Customer, String> {
}
