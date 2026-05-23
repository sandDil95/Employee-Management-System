package com.ems.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(hidden = true) // Hide wrapper classes of EmployeeDTO
public class PagedResponse<T> {
    private List<T> content;
    private PaginationResponse pagination;
}
