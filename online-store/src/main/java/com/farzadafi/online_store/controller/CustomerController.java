package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.CustomerDto;
import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.mapper.CustomerMapper;
import com.farzadafi.online_store.model.Customer;
import com.farzadafi.online_store.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public record CustomerController(CustomerService customerService) {

    @PostMapping("/register")
    public ResponseEntity<ReturnMessage> registerCustomer(@RequestBody CustomerDto customerDto) {
        Customer customer = CustomerMapper.INSTANCE.dtoToModel(customerDto);
        customerService.registerCustomer(customer);
        return new ResponseEntity<>(new ReturnMessage("ok", 201), HttpStatus.CREATED);
    }
}
