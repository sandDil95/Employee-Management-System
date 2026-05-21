package com.ems.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when an employee is not found in the system.
 */
public class EmployeeNotFoundException extends BaseException {

    public EmployeeNotFoundException(String id) {
        super("Employee not found with id: " + id, ErrorCode.EMPLOYEE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
