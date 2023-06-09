package com.farzadafi.online_store.exception;

import com.farzadafi.online_store.dto.ReturnMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ReturnMessage> handleDuplicateException(DuplicateException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ReturnMessage(e.getMessage(), HttpStatus.CONFLICT.value()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ReturnMessage> handleNotFoundException(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ReturnMessage(e.getMessage(), HttpStatus.NO_CONTENT.value()));
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<ReturnMessage> handleHttpClientErrorException() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ReturnMessage("unAuthorize", HttpStatus.UNAUTHORIZED.value()));
    }
}