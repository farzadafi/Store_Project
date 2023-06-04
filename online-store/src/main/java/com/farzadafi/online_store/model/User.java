package com.farzadafi.online_store.model;

import com.farzadafi.online_store.model.enumoration.Role;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class User {
    @Id
    @GeneratedValue
    private String id;

    private String firstname;

    private String lastname;

    private String username;

    private String password;

    @Enumerated
    private Role role;
}
