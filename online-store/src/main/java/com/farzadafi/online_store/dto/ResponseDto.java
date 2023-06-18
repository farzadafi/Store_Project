package com.farzadafi.online_store.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) // not return null value
public record ResponseDto<T>(String message,
                             T info) {
}
