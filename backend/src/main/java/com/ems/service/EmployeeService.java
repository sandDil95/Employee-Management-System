package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;

import java.util.List;

/**
 * Service interface for Employee business operations.
 *
 * Defines all core business logic operations for Employee management
 */
public interface EmployeeService {

    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);
    public List<EmployeeDTO> getAllEmployees();
    public EmployeeDTO getEmployeeById(Long id);
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    public void deleteEmployee(Long id);
}
