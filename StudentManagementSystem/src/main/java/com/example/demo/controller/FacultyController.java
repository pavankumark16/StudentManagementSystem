package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Faculty;
import com.example.demo.service.FacultyService;

import jakarta.validation.Valid;
 
@RestController
@RequestMapping("/faculties")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping
    public Faculty saveFaculty(@Valid @RequestBody Faculty faculty) {
        return facultyService.saveFaculty(faculty);
    }

    @GetMapping
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id);
    }

    @PutMapping("/{id}")
    public Faculty updateFaculty(
            @PathVariable Long id, @Valid
            @RequestBody Faculty faculty) {

        return facultyService.updateFaculty(id, faculty);
    }

    @DeleteMapping("/{id}")
    public String deleteFaculty(@PathVariable Long id) {

        facultyService.deleteFaculty(id);

        return "Faculty deleted successfully";
    }
}