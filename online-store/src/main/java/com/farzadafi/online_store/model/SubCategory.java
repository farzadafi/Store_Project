package com.farzadafi.online_store.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Document
public class SubCategory {
    @Id
    @GeneratedValue
    private String id;

    private String name;

    @ManyToOne
    private Category category;
}
