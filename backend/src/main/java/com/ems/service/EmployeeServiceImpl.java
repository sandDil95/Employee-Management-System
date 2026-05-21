package com.ems.service;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import com.ems.exception.DuplicateEmailException;
import com.ems.exception.EmployeeNotFoundException;
import com.ems.mapper.EmployeeMapper;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeMapper.toDTOList(employeeRepository.findAll());
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
