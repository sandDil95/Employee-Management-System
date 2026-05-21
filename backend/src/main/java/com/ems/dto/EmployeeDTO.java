package com.ems.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for Employee.
 *
 * Used to transfer employee data between client and server
 * without exposing database entity structure.
 */
@Getter
@Setter
@Data
public class EmployeeDTO {

    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    @Positive(message = "Salary must be greater than 0")
    private double salary;
}
