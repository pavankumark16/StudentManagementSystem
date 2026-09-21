package com.example.demo.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.service.JwtService;

@EnableMethodSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtService jwtService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(customUserDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .addFilterBefore(
                new JwtAuthenticationFilter(
                    jwtService,
                    customUserDetailsService
                ),
                UsernamePasswordAuthenticationFilter.class
            )

            .authenticationProvider(authenticationProvider())

            .authorizeHttpRequests(auth -> auth

                // =========================
                // PUBLIC
                // =========================
                .requestMatchers(
                    "/users",
                    "/auth/login",
                    "/error"
                ).permitAll()


                // =========================
                // STUDENT - OWN DATA
                // =========================
                .requestMatchers(
                    "/students/me",
                    "/marks/me",
                    "/attendances/me"
                ).hasRole("STUDENT")


                // =========================
                // STUDENTS
                // =========================

                // View students
                .requestMatchers(HttpMethod.GET, "/students")
                .hasAnyRole("ADMIN", "FACULTY")

                .requestMatchers(HttpMethod.GET, "/students/{id}")
                .hasAnyRole("ADMIN", "FACULTY")

                // Create/update/delete students
                .requestMatchers(
                    HttpMethod.POST,
                    "/students"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/students/{id}"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/students/{id}"
                ).hasRole("ADMIN")


                // =========================
                // DEPARTMENTS
                // =========================

                .requestMatchers("/departments/**")
                .hasRole("ADMIN")


                // =========================
                // COURSES
                // =========================

                .requestMatchers("/courses/**")
                .hasRole("ADMIN")


                // =========================
                // FACULTY
                // =========================

                .requestMatchers("/faculties/**")
                .hasRole("ADMIN")


                // =========================
                // SUBJECTS
                // =========================

                .requestMatchers(HttpMethod.GET, "/subjects")
                .hasAnyRole("ADMIN", "FACULTY")

                .requestMatchers("/subjects/**")
                .hasRole("ADMIN")


                // =========================
                // ATTENDANCE
                // =========================

                .requestMatchers(
                    "/attendances/**"
                ).hasAnyRole("ADMIN", "FACULTY")


                // =========================
                // MARKS
                // =========================

                .requestMatchers(
                    "/marks/**"
                ).hasAnyRole("ADMIN", "FACULTY")


                // =========================
                // EVERYTHING ELSE
                // =========================
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}