package com.drabazha.sentence.builder.api.config.jwt;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static java.util.Objects.isNull;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    public JwtRequestFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Optional<String> tokenWrapper = extractToken(request.getHeader(HttpHeaders.AUTHORIZATION));

        if (tokenWrapper.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = tokenWrapper.get();

        if (notAuthenticated() && tokenService.validateToken(token)) {
            UserDetails user = tokenService.extractUser(token);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }

    private boolean notAuthenticated() {
        return isNull(SecurityContextHolder.getContext().getAuthentication());
    }

    private Optional<String> extractToken(String authorizationHeader) {
        Optional<String> token = Optional.empty();

        if (isJwtToken(authorizationHeader)) {
            token = Optional.of(authorizationHeader.substring(7));
        }

        return token;
    }

    private boolean isJwtToken(String token) {
        return token != null && token.startsWith(JwtTokenService.BEARER);
    }
}
