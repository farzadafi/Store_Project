package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.DuplicateException;
import com.farzadafi.online_store.model.Customer;
import com.farzadafi.online_store.model.enumoration.Role;
import com.farzadafi.online_store.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public record CustomerService(CustomerRepository customerRepository) {

    public void registerCustomer(Customer customer) {
        if (customerRepository.findByUsername(customer.getUsername()).block() != null)
            throw new DuplicateException(String.format("این نام کاربری قبلا استفاده شده است, %s", customer.getUsername()));
        customer.setId(UUID.randomUUID().toString());
        customer.setRole(Role.CUSTOMER);
        customerRepository.save(customer).subscribe();
    }
}
