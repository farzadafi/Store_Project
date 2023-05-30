package com.farzadafi.online_store.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public record CategoryDto(int id, String name) {
}
