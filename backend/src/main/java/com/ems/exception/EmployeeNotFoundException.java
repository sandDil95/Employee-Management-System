package com.ems.exception;

import org.springframework.http.HttpStatus;

public class EmployeeNotFoundException extends BaseException {

    public EmployeeNotFoundException(String id) {
        super("Employee not found with id: " + id, ErrorCode.EMPLOYEE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
