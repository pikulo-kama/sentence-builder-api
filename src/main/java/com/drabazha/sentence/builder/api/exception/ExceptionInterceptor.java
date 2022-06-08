package com.drabazha.sentence.builder.api.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ExceptionInterceptor {

    @ExceptionHandler(Exception.class)
    public UserResponse handleAnyException(Exception exception) {
        log.error("Unexpected exception", exception);
        return UserResponse.error("Unexpected error occurred");
    }

    @ExceptionHandler(RestException.class)
    public UserResponse handleRestException(RestException restException) {
        log.error(restException.getMessage());
        return new UserResponse(restException.getMessage(), ResponseType.ERROR, restException.getResponseData());
    }
}
