package com.ems.exception;

import org.springframework.http.HttpStatus;


/**
 * Exception thrown when attempting to create a user with an username that already exists.
 */
public class DuplicateUsernameException extends BaseException {

    public DuplicateUsernameException(String username) {
        super("Username already exists: " + username, ErrorCode.DUPLICATE_USERNAME, HttpStatus.CONFLICT);
    }
}