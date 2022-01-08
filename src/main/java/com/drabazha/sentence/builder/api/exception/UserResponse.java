package com.drabazha.sentence.builder.api.exception;

import lombok.Builder;
import lombok.Data;

import java.util.Collections;
import java.util.Map;

import static com.drabazha.sentence.builder.api.exception.ResponseType.ERROR;
import static com.drabazha.sentence.builder.api.exception.ResponseType.SUCCESS;

@Data
@Builder
public class UserResponse {

    private String message;

    private ResponseType responseType;

    private Map<String, Object> responseData;

    public static UserResponse success(String message) {
        return success(message, Collections.emptyMap());
    }

    public static UserResponse success(String message, Map<String, Object> responseData) {
        return new UserResponse(message, SUCCESS, responseData);
    }

    public static UserResponse error(String message) {
        return error(message, Collections.emptyMap());
    }

    public static UserResponse error(String message, Map<String, Object> responseData) {
        return new UserResponse(message, ERROR, responseData);
    }
}
