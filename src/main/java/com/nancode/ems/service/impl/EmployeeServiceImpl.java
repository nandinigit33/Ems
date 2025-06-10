package com.nancode.ems.service.impl;

import com.nancode.ems.dto.EmployeeDto;
import com.nancode.ems.entity.Employee;
import com.nancode.ems.exception.ResourceNotFoundException;
import com.nancode.ems.mapper.EmployeeMapper;
import com.nancode.ems.repository.EmployeeRepository;
import com.nancode.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

//    @Override
//    public Employee createEmployee(Employee employee) {
//        employeeRepository.save(employee);
//        return employee;
//    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee doesn't exist with given id : " +employeeId)
        );
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

//    @Override
//    public List<Employee> getAllEmployees() {
//        List<Employee> employees = employeeRepository.findAll();
//        return employees;
//    }
@Override
public List<EmployeeDto> getAllEmployees() {
    List<Employee> employees = employeeRepository.findAll();
    return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
}

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee doesn't exist with given id " + employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee doesn't exist with given id " + employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }


}
