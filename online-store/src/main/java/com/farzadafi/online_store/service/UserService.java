package com.farzadafi.online_store.service;

import com.farzadafi.online_store.exception.NotFoundException;
import com.farzadafi.online_store.model.User;
import com.farzadafi.online_store.repository.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public record UserService(UserRepository userRepository) {

    public User findByUsername(String username) {
        var userMono = userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(
                        new NotFoundException(String.format("یوزری با این نام کاربری پیدا نشد %s", username))));
        return userMono.block();
    }
}
