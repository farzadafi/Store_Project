package com.farzadafi.online_store.jwt;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UsernameAndPasswordAuthenticationRequest {

    private String username;
    private String password;
}