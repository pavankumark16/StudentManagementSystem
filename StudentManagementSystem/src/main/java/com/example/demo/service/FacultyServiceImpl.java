package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Faculty;
import com.example.demo.exception.FacultyNotFoundException;
import com.example.demo.repository.FacultyRepository;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public Faculty saveFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    @Override
    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    @Override
    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() -> new FacultyNotFoundException("Faculty not found"));
    }

    @Override
    public Faculty updateFaculty(Long id, Faculty faculty) {

        Faculty existingFaculty =
                facultyRepository.findById(id).orElse(null);

        if (existingFaculty != null) {

            existingFaculty.setFirstName(faculty.getFirstName());
            existingFaculty.setMiddleName(faculty.getMiddleName());
            existingFaculty.setLastName(faculty.getLastName());
            existingFaculty.setEmail(faculty.getEmail());
            existingFaculty.setPhone(faculty.getPhone());
            existingFaculty.setGender(faculty.getGender());
            existingFaculty.setQualification(faculty.getQualification());
            existingFaculty.setAddress(faculty.getAddress());

            return facultyRepository.save(existingFaculty);
        }

        return null;
    }

    @Override
    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }
}