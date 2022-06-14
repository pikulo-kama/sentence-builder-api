package com.drabazha.sentence.builder.api.config.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class JwtUserDetailsService implements UserDetailsService {

    @Value("${admin.username}")
    private String username;

    @Value("${admin.password}")
    private String password;

    private final PasswordEncoder passwordEncoder;

    public JwtUserDetailsService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals(this.username)) {
            return new User(username,
                    passwordEncoder.encode(password),
                    Collections.emptyList());
        }
        throw new UsernameNotFoundException("User not found");
    }
}
