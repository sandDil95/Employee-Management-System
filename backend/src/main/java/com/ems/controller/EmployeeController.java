package com.ems.controller;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public EmployeeDTO createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveEmployee(employeeDTO);
    }

    /**
     * Get all employees.
     *
     * @return
     */
    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    /**
     * Get employee by ID.
     *
     * @param id employee ID
     * @return EmployeeDTO
     */
    @GetMapping("/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    /**
     * Update an existing employee.
     *
     * @param id employee ID
     * @param employeeDTO updated employee data
     * @return updated EmployeeDTO
     */
    @PutMapping("/{id}")
    public EmployeeDTO updateEmployee( @PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.updateEmployee(id, employeeDTO);
    }

    /**
     * Delete employee by ID.
     *
     * @param id employee ID
     * @return success message
     */
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully";
    }
}
