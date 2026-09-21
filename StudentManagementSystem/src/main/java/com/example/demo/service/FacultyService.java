package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Faculty;

public interface FacultyService {

    Faculty saveFaculty(Faculty faculty);

    List<Faculty> getAllFaculties();

    Faculty getFacultyById(Long id);

    Faculty updateFaculty(Long id, Faculty faculty);

    void deleteFaculty(Long id);
}