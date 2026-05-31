package com.ems.mapper;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.List;

/**
 * Mapper interface for converting between Employee entity and DTO.
 *
 * Uses MapStruct to automatically generate implementation
 * at compile time
 */
@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    public EmployeeDTO toEmployeeDTO(Employee employee);

    public Employee toEmployeeEntity(EmployeeDTO dto);

    public List<EmployeeDTO> toDTOList(List<Employee> employees);

    @Mapping(target = "id", ignore = true)
    public void updateEmployeeFromDto(EmployeeDTO dto, @MappingTarget Employee entity);
}
