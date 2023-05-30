package com.farzadafi.online_store.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "already exists")
public class DuplicateException extends RuntimeException{

    public DuplicateException(String message) {
        super(message);
    }
}
