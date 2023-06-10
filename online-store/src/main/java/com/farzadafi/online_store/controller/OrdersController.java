package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.OrdersDto;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.mapper.OrdersMapper;
import com.farzadafi.online_store.model.Orders;
import com.farzadafi.online_store.service.OrdersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("save")
    public ResponseEntity<ReturnMessage> saveOrder(OrdersDto ordersDto) {
        Orders orders = OrdersMapper.INSTANCE.dtoToModel(ordersDto);
        ordersService.save(orders);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }
}
