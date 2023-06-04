package com.farzadafi.online_store.model;

import lombok.*;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document
@TypeAlias("customer")
public class Customer extends User {
    private Long balance;
}
