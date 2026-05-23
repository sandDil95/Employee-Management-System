package com.ems.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(hidden = true)
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
}
