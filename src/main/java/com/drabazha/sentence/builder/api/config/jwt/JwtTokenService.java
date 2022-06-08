package com.drabazha.sentence.builder.api.config.jwt;

import com.drabazha.sentence.builder.api.dto.form.LoginForm;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;

@Service
public class JwtTokenService implements TokenService, AuthenticationService {

    public static final String BEARER = "Bearer ";

    private final JwtUserDetailsService jwtUserDetailsService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.lifetime}")
    private Integer tokenLifetimeHours;

    public JwtTokenService(JwtUserDetailsService jwtUserDetailsService) {
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @Override
    public UserResponse authenticate(LoginForm loginForm, Consumer<LoginForm> authConsumer) {
        authConsumer.accept(loginForm);
        String token = generateToken(loginForm.getUsername());

        UserResponse userResponse = UserResponse.success("Login was successful");
        userResponse.setResponseData(Map.of("authorization", token));
        return userResponse;
    }

    @Override
    public String generateToken(String username) {
        return Jwts.builder()
                .setClaims(new HashMap<>())
                .setSubject(username)
                .setExpiration(createExpirationDate())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    @Override
    public Boolean validateToken(String token) {
        String username = getClaimFromToken(token, Claims::getSubject);
        UserDetails user = extractUser(token);

        return user.getUsername().equals(username) && !isExpired(token);
    }

    @Override
    public UserDetails extractUser(String token) {
        String username = getClaimFromToken(token, Claims::getSubject);
        return jwtUserDetailsService.loadUserByUsername(username);
    }

    private Boolean isExpired(String token) {
        Date expirationDate = getClaimFromToken(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> function) {
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return function.apply(claims);
    }

    private Date createExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, tokenLifetimeHours);
        return calendar.getTime();
    }
}
