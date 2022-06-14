package com.drabazha.sentence.builder.api.config.jwt;

import org.springframework.security.core.userdetails.UserDetails;

public interface TokenService {

    String generateToken(String username);

    Boolean validateToken(String token);

    UserDetails extractUser(String token);
}
