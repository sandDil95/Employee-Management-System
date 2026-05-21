package com.ems.exception;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

/**
 * Standard API error response structure used across the application.
 *
 * This class is returned whenever an exception occurs in the system.
 * It provides a consistent error format for the frontend and API consumers.
 *
 * It includes general error information as well as field-level validation errors.
 */
@Builder
@Data
public class ApiErrorResponse {
    /**
     * Human-readable error message describing what went wrong.
     */
    private String message;
    /**
     * HTTP status code of the error response.
     * Example: 400, 404, 500
     */
    private int status;
    /**
     * Timestamp when the error occurred (in milliseconds since epoch).
     */
    private long timestamp;
    /**
     * Field-level validation or business errors.
     *
     * Example:
     * {
     *   "email": "Email is already in use",
     *   "firstName": "First name is required"
     * }
     */
    private Map<String, String> errors;
}
