package com.ems.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when attempting to create an employee/user with an email that already exists.
 */
public class DuplicateEmailException extends BaseException {

    public DuplicateEmailException(String email) {
        super("Email already exists: " + email, ErrorCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
    }
}
