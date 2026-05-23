package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
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
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * Create a new employee.
     *
     * @param employeeDTO employee data sent from client
     * @return created EmployeeDTO
     */
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.saveEmployee(employeeDTO));
    }

    /**
     * Get all employees.
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeDTO>>> getAllEmployees(
            @RequestParam(required=false) String keyword,
            @RequestParam(required=false) String department,
            @RequestParam(defaultValue="0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        PagedResponse<EmployeeDTO> data = employeeService.getAllEmployees(keyword, department, page, size, sortBy, direction);
        ApiResponse<PagedResponse<EmployeeDTO>> apiResponse = new ApiResponse<>(true, "Employees fetched succesfully", data);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Get employee by ID.
     *
     * @param id employee ID
     * @return EmployeeDTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    /**
     * Update an existing employee.
     *
     * @param id employee ID
     * @param employeeDTO updated employee data
     * @return updated EmployeeDTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee( @PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDTO));
    }

    /**
     * Delete employee by ID.
     *
     * @param id employee ID
     * @return success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
