package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Service interface for Employee business operations.
 *
 * Defines all core business logic operations for Employee management
 */
public interface EmployeeService {

    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);
    PagedResponse<EmployeeDTO> getAllEmployees(String keyword, String department, int page, int size, String sortBy, String direction);
    public EmployeeDTO getEmployeeById(Long id);
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    public void deleteEmployee(Long id);
}
