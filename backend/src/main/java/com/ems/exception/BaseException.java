package com.ems.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Base class for all custom exceptions in the system.
 *
 * Provides standard structure for error handling across the application.
 */
@Getter
public abstract class BaseException extends RuntimeException {
    private final ErrorCode code;
    private final HttpStatus httpStatus;

    protected BaseException(String message, ErrorCode code, HttpStatus httpStatus) {
        super(message);
        this.code = code;
        this.httpStatus = httpStatus;
    }
}
