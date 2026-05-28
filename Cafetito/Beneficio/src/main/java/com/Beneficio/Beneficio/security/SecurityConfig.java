package com.Beneficio.Beneficio.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/actuator/**").permitAll()

                        .requestMatchers("/api/cuentas/interno/**").permitAll()

                        .requestMatchers("/api/parcialidades/interno/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/parcialidades/**")
                        .hasAnyRole("BENEFICIO", "PESOCABAL", "AGRICULTOR")

                        .requestMatchers(HttpMethod.PUT, "/api/parcialidades/**")
                        .hasRole("BENEFICIO")

                        .requestMatchers(HttpMethod.GET, "/api/cuentas/**")
                        .hasAnyRole("BENEFICIO", "PESOCABAL", "AGRICULTOR")

                        .requestMatchers(HttpMethod.POST, "/api/cuentas/**")
                        .hasRole("BENEFICIO")

                        .requestMatchers(HttpMethod.PUT, "/api/cuentas/**")
                        .hasAnyRole("BENEFICIO", "PESOCABAL")

                        .requestMatchers(HttpMethod.DELETE, "/api/cuentas/**")
                        .hasRole("BENEFICIO")

                        .requestMatchers("/api/peso-cabal/**")
                        .hasAnyRole("PESOCABAL", "BENEFICIO")

                        .requestMatchers("/api/historial/**").permitAll()

                        .requestMatchers("/api/transitos/**")
                        .hasAnyRole("BENEFICIO", "PESOCABAL", "AGRICULTOR")

                        .requestMatchers("/api/bitacora/**")
                        .hasRole("BENEFICIO")

                        .requestMatchers("/api/catalogos/**")
                        .authenticated()

                        .anyRequest()
                        .authenticated()
                )
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}