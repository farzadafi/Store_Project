package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.Orders;
import com.farzadafi.online_store.repository.OrdersRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public record OrdersService(OrdersRepository ordersRepository) {

    public void save(Orders orders) {
        orders.setId(UUID.randomUUID().toString());
        orders.setOrderTime(LocalDateTime.now());
        ordersRepository.save(orders).subscribe();
    }

    public List<Orders> getAllOrders() {
        Flux<Orders> ordersFlux = ordersRepository.findAll()
                .switchIfEmpty(Mono.error(new NotFoundException("No orders found")));
        return ordersFlux.collectList().block();
    }
}
