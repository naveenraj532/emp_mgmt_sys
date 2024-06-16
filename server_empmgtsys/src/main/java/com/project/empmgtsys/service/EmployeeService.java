package com.project.empmgtsys.service;

import com.project.empmgtsys.entity.Employee;
import com.project.empmgtsys.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee){

        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){

        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){

        if(!employeeRepository.existsById(id)){

            throw new EntityNotFoundException("Employee not found");
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){

        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingEmployee);
        }

        return null;
    }

}

//package com.project.empmgtsys.service;
//import com.project.empmgtsys.entity.Employee;
//import com.project.empmgtsys.repository.EmployeeRepository;
//import org.hibernate.Hibernate;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.Optional;
//@Service
//public class EmployeeService {
//    @Autowired
//    private EmployeeRepository employeeRepository;
//    @Transactional(readOnly = true)
//    public Optional<Employee> getEmployeeById(Long id) {
//        Optional<Employee> employee = employeeRepository.findById(id);
//        return employee;
//    }
////    @Transactional(readOnly = true)
////    public String getEmployeeRoleById(Long id) {
////        Optional<Employee> employee = employeeRepository.findById(id);
////        // Explicitly initialize the role object when it's explicitly called
////        return employee.map(e -> {
////            Hibernate.initialize(e.getRole());
////            return e.getRole() != null ? e.getRole().getRole_name() : null;
////        }).orElse(null);
////    }
//
//    @Transactional(readOnly = true)
//    public List<Employee> getAllEmployees(){
//
//         return employeeRepository.findAll();
//    }
//}