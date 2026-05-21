package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository layer for Employee entity.
 *
 * Handles database operations for Employee
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    /**
     * Checks whether an employee exists with the given email.
     * Used to prevent duplicate employee creation.
     *
     * @param email employee email
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
