package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents an Employee entity in the system.
 *
 * This entity is mapped to the "employees" table in the database
 * and stores core employee information
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    private String department;

    private double salary;
}
