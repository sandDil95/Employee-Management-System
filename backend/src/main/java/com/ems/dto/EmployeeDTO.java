package com.ems.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(example = "John", description = "Employee first name")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Schema(example = "Lee", description = "Employee last name")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @Schema(example = "johnlee@gmail.com", description = "Employee email")
    private String email;

    @NotBlank(message = "Department is required")
    @Schema(example = "IT", description = "Employee department")
    private String department;

    @Positive(message = "Salary must be greater than 0")
    @Schema(example = "100000", description = "Employee salary")
    private double salary;
}
