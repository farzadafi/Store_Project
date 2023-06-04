package com.farzadafi.online_store.model;

import com.farzadafi.online_store.model.enumoration.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Document("users")
public class User {
    @Id
    @GeneratedValue
    private String id;

    private String firstname;

    private String lastname;

    @Indexed(unique = true)
    private String username;

    private String password;

    @Enumerated
    private Role role;
}
