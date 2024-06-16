package com.project.empmgtsys.controller;
import com.project.empmgtsys.entity.Employee;
import com.project.empmgtsys.entity.Users;
import com.project.empmgtsys.service.EmployeeService;
import com.project.empmgtsys.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/")
    public Employee postEmployee(@RequestBody Employee employee){

        return employeeService.postEmployee(employee);
    }

    @GetMapping("/list")
    public List<Employee> getALlEmployees(){

        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){

        try {

            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
        }
        catch (EntityNotFoundException e){

            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){

        Employee employee = employeeService.getEmployeeById(id);
        if(employee == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);

    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);

        if (updatedEmployee == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updatedEmployee);
    }

}

//package com.project.empmgtsys.controller;
//import com.project.empmgtsys.entity.Employee;
//import com.project.empmgtsys.service.EmployeeService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/employees")
//public class EmployeeController {
//    @Autowired
//    private EmployeeService employeeService;
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getEmployee(@PathVariable Long id) {
//        return ResponseEntity.of(employeeService.getEmployeeById(id));
//    }
////    @GetMapping("/{id}/role")
////    public ResponseEntity<?> getEmployeeRole(@PathVariable Long id) {
////        String roleName = employeeService.getEmployeeRoleById(id);
////        if (roleName != null) {
////            return ResponseEntity.ok(roleName);
////        } else {
////            return ResponseEntity.notFound().build();
////        }
////    }
//
//    @GetMapping("/list")
//    public List<Employee> getALlEmployees(){
//
//        return employeeService.getAllEmployees();
//    }
//}
