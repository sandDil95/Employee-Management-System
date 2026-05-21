package com.ems.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Builder
@Data
public class ApiErrorResponse {
    private String message;
    private int status;
    private long timestamp;
    private Map<String, String> errors;
}
