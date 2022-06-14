package com.drabazha.sentence.builder.api.config.jwt;

import com.drabazha.sentence.builder.api.dto.form.LoginForm;
import com.drabazha.sentence.builder.api.exception.UserResponse;

import java.util.function.Consumer;

public interface AuthenticationService {

    UserResponse authenticate(LoginForm loginForm, Consumer<LoginForm> authConsumer);
}
