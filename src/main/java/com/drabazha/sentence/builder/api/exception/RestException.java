package com.drabazha.sentence.builder.api.exception;

import lombok.Getter;

import java.util.Collections;
import java.util.Map;

public class RestException extends RuntimeException{

    @Getter
    private final Map<String, Object> responseData;

    public RestException(String message) {
        this(message, Collections.emptyMap());
    }

    public RestException(String message, Map<String, Object> responseData) {
        super(message);
        this.responseData = responseData;
    }
}
