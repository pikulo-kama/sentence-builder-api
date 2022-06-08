package com.drabazha.sentence.builder.api.exception;

import lombok.Builder;
import lombok.Data;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;

import static com.drabazha.sentence.builder.api.exception.ResponseType.ERROR;
import static com.drabazha.sentence.builder.api.exception.ResponseType.SUCCESS;

@Data
@Builder
public class UserResponse {

    private String message;

    private ResponseType responseType;

    private Map<String, Object> responseData;

    public static UserResponse success(String message) {
        return success(message, null, null);
    }

    public static UserResponse success(String message, String k1, Object v1) {
        return new UserResponse(message, SUCCESS, Objects.isNull(k1) ? Collections.emptyMap() : Map.of(k1, v1));
    }

    public static UserResponse error(String message) {
        return error(message, null, null);
    }

    public static UserResponse error(String message, String k1, Object v1) {
        return new UserResponse(message, ERROR, Objects.isNull(k1) ? Collections.emptyMap() : Map.of(k1, v1));
    }
}
