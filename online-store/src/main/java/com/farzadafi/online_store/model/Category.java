package com.farzadafi.online_store.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class Category {
    @Id
    @GeneratedValue
    private String id;

    @Indexed(unique = true)
    private String name;
}
