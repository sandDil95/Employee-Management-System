package com.ems.exception;

import org.springframework.http.HttpStatus;

public class DuplicateEmailException extends BaseException {

    public DuplicateEmailException(String email) {
        super("Email already exists: " + email, ErrorCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
    }
}
