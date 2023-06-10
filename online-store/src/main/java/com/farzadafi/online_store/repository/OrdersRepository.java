package com.farzadafi.online_store.repository;

import com.farzadafi.online_store.model.Orders;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface OrdersRepository extends ReactiveMongoRepository<Orders, String> {
}
