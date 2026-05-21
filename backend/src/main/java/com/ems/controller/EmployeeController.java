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

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public EmployeeDTO createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveEmployee(employeeDTO);
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public EmployeeDTO updateEmployee( @PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.updateEmployee(id, employeeDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "Employee deleted successfully";
    }
}
