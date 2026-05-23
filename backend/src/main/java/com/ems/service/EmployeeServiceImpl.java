package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.dto.PagedResponse;
import com.ems.dto.PaginationResponse;
import com.ems.entity.Employee;
import com.ems.exception.DuplicateEmailException;
import com.ems.exception.EmployeeNotFoundException;
import com.ems.mapper.EmployeeMapper;
import com.ems.repository.EmployeeRepository;
import com.ems.specification.EmployeeSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of EmployeeService.
 *
 * Contains all business logic related to Employee management
 */
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepository.existsByEmail(employeeDTO.getEmail())) {
            throw new DuplicateEmailException(employeeDTO.getEmail());
        }
        Employee employee = employeeMapper.toEmployeeEntity(employeeDTO);
        Employee saved = employeeRepository.save(employee);

        return employeeMapper.toEmployeeDTO(saved);
    }

    // Get all (Search + Pagination + Sorting)
    @Override
    public PagedResponse<EmployeeDTO> getAllEmployees(String keyword, String department, int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Specification<Employee> spec = Specification.where(EmployeeSpecification.filterByKeyword(keyword))
                .and(EmployeeSpecification.filterByDepartment(department));
        Page<Employee> employees = employeeRepository.findAll(spec, pageable);
        List<EmployeeDTO> content = employees.map(employeeMapper::toEmployeeDTO).getContent();

        PaginationResponse paginationResponse = new PaginationResponse(
                employees.getNumber(),
                employees.getSize(),
                employees.getTotalElements(),
                employees.getTotalPages());
        return new PagedResponse<>(content, paginationResponse);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        return employeeMapper.toEmployeeDTO(employee);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO updatedEmployeeDTO) {
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        employeeMapper.updateEmployeeFromDto(updatedEmployeeDTO, existingEmployee);
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return employeeMapper.toEmployeeDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }
}
