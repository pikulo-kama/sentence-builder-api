package com.drabazha.sentence.builder.api.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionInterceptor {

    @ExceptionHandler(Exception.class)
    public UserResponse handleAnyException(Exception exception) {
        return UserResponse.error("Unexpected error occurred");
    }

    @ExceptionHandler(RestException.class)
    public UserResponse handleRestException(RestException restException) {
        return new UserResponse(restException.getMessage(), ResponseType.ERROR, restException.getResponseData());
    }
}
