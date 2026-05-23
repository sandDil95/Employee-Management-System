package com.ems.specification;

import com.ems.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

/**
 * Dynamic query builder for Employee filtering.
 */
public class EmployeeSpecification {

    /**
     * Search by keyword across multiple fields.
     */
    public static Specification<Employee> filterByKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction();
            }
            String search = "%" + keyword.toLowerCase() + "%";
            return cb.or(cb.like(cb.lower(root.get("firstName")), search),
                    cb.like(cb.lower(root.get("lastName")), search),
                    cb.like(cb.lower(root.get("email")), search),
                    cb.like(cb.lower(root.get("department")), search));
        };
    }

    /**
     * Filter by department
     */
    public static Specification<Employee> filterByDepartment(String department) {
        return (root, query, cb) ->
                department == null ? cb.conjunction() : cb.equal(root.get("department"), department);
    }

    /**
     * Filter by email
     */
    public static Specification<Employee> filterByEmail(String email) {
        return (root, query, cb) ->
                email == null ? cb.conjunction() : cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }
}
