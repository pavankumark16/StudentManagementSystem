package com.example.demo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Department;
import com.example.demo.exception.DepartmentNotFoundException;
import com.example.demo.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl
        implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }
    
    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    
    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found"));
    }
    
     
    @Override
    public Department updateDepartment(Long id, Department department) {

        Department existingDepartment =
                departmentRepository.findById(id).orElse(null);

        if (existingDepartment != null) {

            existingDepartment.setName(department.getName());

            return departmentRepository.save(existingDepartment);
        }

        return null;
    }
    
    @Override
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
    
}