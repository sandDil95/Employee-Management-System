package com.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(MethodArgumentNotValidException exception) {
        Map<String, String> errors = exception.getBindingResult()
                .getFieldErrors().stream().collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage
                ));
        ApiErrorResponse response = ApiErrorResponse.builder()
                .message("Validation failed")
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(System.currentTimeMillis())
                .errors(errors).build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Base Runtime Exception Handler
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiErrorResponse> handleBaseException(BaseException exception) {

        ApiErrorResponse response = ApiErrorResponse.builder()
                .message(exception.getMessage())
                .status(exception.getHttpStatus().value())
                .timestamp(System.currentTimeMillis())
                .build();
        return new ResponseEntity<>(response, exception.getHttpStatus());
    }

    // Fallback Runtime Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(Exception exception) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", exception.getMessage());

        ApiErrorResponse response = ApiErrorResponse.builder()
                .message("Internal server error")
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(System.currentTimeMillis())
                .errors(errors)
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
