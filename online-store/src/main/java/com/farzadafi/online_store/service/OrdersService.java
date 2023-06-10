package com.farzadafi.online_store.service;

import com.farzadafi.online_store.model.Orders;
import com.farzadafi.online_store.repository.OrdersRepository;
import org.springframework.stereotype.Service;

@Service
public record OrdersService(OrdersRepository ordersRepository) {

    public void save(Orders orders) {
        ordersRepository.save(orders).subscribe();
    }
}
