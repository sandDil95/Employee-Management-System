package com.ems.service;

import com.ems.entity.Employee;

import java.util.List;

public interface EmployeeService {

    public Employee saveEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public Employee getEmployeeById(Long id);
    public Employee updateEmployee(Long id, Employee employee);
    public void deleteEmployee(Long id);
}
