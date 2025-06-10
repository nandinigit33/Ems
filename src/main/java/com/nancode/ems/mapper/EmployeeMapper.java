package com.nancode.ems.mapper;

import com.nancode.ems.dto.EmployeeDto;
import com.nancode.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );


    }
//    EmployeeDto empDTO = new EmployeeDto();
//        empDTO.setEmail(employee.getEmail());
//        return  empDTO;

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
