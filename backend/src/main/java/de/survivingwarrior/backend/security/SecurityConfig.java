package de.survivingwarrior.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName(null);

        //new code for Spring 3.1 and newer (not sure if 3.0.6 is supported as well)

        return http
                .csrf(csrf -> csrf
                //.csrf(AbstractHttpConfigurer::disable)
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(requestHandler))

                .httpBasic(basic -> basic.authenticationEntryPoint(
                        (request, response, authException) ->
                                response.sendError(
                                        HttpStatus.UNAUTHORIZED.value(),
                                        HttpStatus.UNAUTHORIZED.getReasonPhrase()
                                )))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/user/**").permitAll();
                    auth.requestMatchers("/api/**").authenticated();
                    //auth.requestMatchers("/api/**/**").authenticated();
                    auth.requestMatchers("/").permitAll();
                    auth.anyRequest().permitAll();
                })
                .build();
    }
}