package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.Orders;
import com.farzadafi.online_store.repository.OrdersRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public record OrdersService(OrdersRepository ordersRepository) {

    public void save(Orders orders) {
        ordersRepository.save(orders).subscribe();
    }

    public List<Orders> getAllOrders() {
        Flux<Orders> ordersFlux = ordersRepository.findAll()
                .switchIfEmpty(Mono.error(new NotFoundException("No orders found")));
        return ordersFlux.collectList().block();
    }
}
