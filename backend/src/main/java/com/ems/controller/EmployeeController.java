package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Employee operations.
 *
 * This controller exposes endpoints for creating, updating,
 * retrieving, deleting, and searching employees.
 *
 * It acts as the entry point for all Employee-related HTTP requests.
 */
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/employees")
@Tag(name = "Employee Controller", description = "Employee Management APIs")
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * Create a new employee.
     *
     * @param employeeDTO employee data sent from client
     * @return created EmployeeDTO
     */
    @PostMapping
    @Operation(summary = "Create Employee")
    public ResponseEntity<ApiResponse<EmployeeDTO>> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = employeeService.saveEmployee(employeeDTO);
        ApiResponse<EmployeeDTO> response = new ApiResponse<>(true, "Employee created successfully", createdEmployee);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all employees.
     *
     * @return
     */
    @GetMapping
    @Operation(summary = "Get all employees with pagination, sorting and filtering")
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeDTO>>> getAllEmployees(
            @RequestParam(required=false) String keyword,
            @RequestParam(required=false) String department,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        PagedResponse<EmployeeDTO> data = employeeService.getAllEmployees(keyword, department, page, size, sortBy, direction);
        ApiResponse<PagedResponse<EmployeeDTO>> apiResponse = new ApiResponse<>(true, "Employees fetched successfully", data);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Get employee by ID.
     *
     * @param id employee ID
     * @return EmployeeDTO
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        ApiResponse response = new ApiResponse(true, "Employee fetched successfully", employee);
        return ResponseEntity.ok(response);
    }

    /**
     * Update an existing employee.
     *
     * @param id employee ID
     * @param employeeDTO updated employee data
     * @return updated EmployeeDTO
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update employee")
    public ResponseEntity<ApiResponse<EmployeeDTO>> updateEmployee( @PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        ApiResponse<EmployeeDTO> response = new ApiResponse<>(true, "Employee updated successfully", updatedEmployee);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete employee by ID.
     *
     * @param id employee ID
     * @return success message
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
