package com.farzadafi.online_store.service;

import com.farzadafi.online_store.model.Customer;
import com.farzadafi.online_store.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public record CustomerService(CustomerRepository customerRepository) {

    public void registerCustomer(Customer customer) {
        customerRepository.save(customer).subscribe();
    }
}
