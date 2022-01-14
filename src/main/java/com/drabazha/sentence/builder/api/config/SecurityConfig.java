package com.drabazha.sentence.builder.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${admin.username}")
    private String username;

    @Value("${admin.password}")
    private String password;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/v2/sentences/generate").permitAll()
                .antMatchers("/**").authenticated()
                    .and()
                .formLogin().permitAll()
                    .and()
                .logout().permitAll()
                .and().cors()
                .and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser(username)
                .password(String.format("{noop}%s", password))
                .roles("ADMIN");
    }
}
