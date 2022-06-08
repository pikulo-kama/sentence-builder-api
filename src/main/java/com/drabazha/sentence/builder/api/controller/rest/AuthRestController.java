package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.config.jwt.AuthenticationService;
import com.drabazha.sentence.builder.api.dto.form.LoginForm;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.function.Consumer;

@RestController
@RequestMapping("${api.private}/auth")
public class AuthRestController {

    private final AuthenticationService authenticationService;
    private final AuthenticationManager authenticationManager;

    public AuthRestController(AuthenticationService authenticationService,
                              AuthenticationManager authenticationManager) {
        this.authenticationService = authenticationService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public UserResponse login(@Validated @RequestBody LoginForm loginForm) {
        Consumer<LoginForm> authConsumer = form -> authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        form.getUsername(), form.getPassword()));

        return authenticationService.authenticate(loginForm, authConsumer);
    }
}
