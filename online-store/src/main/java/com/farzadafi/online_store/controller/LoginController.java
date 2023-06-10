package com.farzadafi.online_store.controller;

import com.farzadafi.online_store.dto.ReturnMessage;
import com.farzadafi.online_store.jwt.UsernameAndPasswordAuthenticationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Objects;

// I have to remove and refactor this :) todo
//@CrossOrigin(methods = RequestMethod.POST, allowCredentials = "true", allowedHeaders = "*", originPatterns = "*", origins = "allowedOriginPatterns")
@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public LoginController(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @CrossOrigin(methods = RequestMethod.POST, allowCredentials = "true", allowedHeaders = "*", originPatterns = "*", origins = "allowedOriginPatterns")
    @PostMapping("/getToken")
    public ResponseEntity<ReturnMessage> getToken(@RequestBody UsernameAndPasswordAuthenticationRequest user) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("username", user.getUsername());
        map.put("password", user.getPassword());
        String jsonString = "";
        try {
            jsonString = objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        HttpEntity<String> request = new HttpEntity<>(jsonString);
        ResponseEntity<Void> response = restTemplate.postForEntity("http://localhost:8080/login", request, Void.class);
        String token = Objects.requireNonNull(response.getHeaders().get("Authorization")).get(0).substring(7);
        return new ResponseEntity<>(new ReturnMessage(token, 200), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/verify-token")
    public String verifyToken() {
        return "OK";
    }
}
