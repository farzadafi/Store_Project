package com.farzadafi.online_store.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Getter
@Setter
@Document("users")
public class Admin extends User {
}
