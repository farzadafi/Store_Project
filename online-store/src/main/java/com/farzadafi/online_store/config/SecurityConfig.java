package com.farzadafi.online_store.config;

import com.farzadafi.online_store.jwt.JwtConfig;
import com.farzadafi.online_store.jwt.JwtTokenVerifier;
import com.farzadafi.online_store.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.farzadafi.online_store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtTokenVerifier jwtTokenVerifier;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserService userService;

    public SecurityConfig(JwtTokenVerifier jwtTokenVerifier, JwtConfig jwtConfig, SecretKey secretKey,
                          BCryptPasswordEncoder passwordEncoder, UserService userService) {
        this.jwtTokenVerifier = jwtTokenVerifier;
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
//                .csrf(AbstractHttpConfigurer::disable)
                .csrf(csrf -> csrf.ignoringRequestMatchers("/**"))
                .sessionManagement(authority -> authority.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter
                        (authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)),
                                jwtConfig, secretKey))
                .addFilterAfter(jwtTokenVerifier, JwtUsernameAndPasswordAuthenticationFilter.class)
                .anonymous(authority -> authority.principal("guest").authorities("guest"))
                .authorizeHttpRequests(authority -> authority.requestMatchers("/**").permitAll());
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService((username) -> userService
                        .findByUsernameOptional(username)
                        .orElseThrow(() -> new UsernameNotFoundException(String.format("This %s notFound!", username))))
                .passwordEncoder(passwordEncoder);
    }
}