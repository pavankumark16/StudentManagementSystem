package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Course;
import com.example.demo.entity.Faculty;
import com.example.demo.entity.Subject;
import com.example.demo.exception.SubjectNotFoundException;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.FacultyRepository;
import com.example.demo.repository.SubjectRepository;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public Subject saveSubject(Subject subject) {

        Course course = courseRepository
                .findById(subject.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Faculty faculty = facultyRepository
                .findById(subject.getFaculty().getId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        
        subject.setCourse(course);
        subject.setFaculty(faculty);
        
        return subjectRepository.save(subject);
    }

    @Override
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new SubjectNotFoundException("Subject not found"));
    }

    @Override
    public Subject updateSubject(Long id, Subject subject) {

        Subject existingSubject =
                subjectRepository.findById(id).orElse(null);
        
        if (existingSubject != null) {
        	
        	  Course course = courseRepository
                      .findById(subject.getCourse().getId())
                      .orElseThrow(() -> new RuntimeException("Course not found"));

        	  Faculty faculty = facultyRepository
        		        .findById(subject.getFaculty().getId())
        		        .orElseThrow(() -> new RuntimeException("Faculty not found"));
        	  
            existingSubject.setName(subject.getName());
            existingSubject.setCode(subject.getCode());
            existingSubject.setCredits(subject.getCredits());
            existingSubject.setCourse(course);
            existingSubject.setFaculty(faculty);

            return subjectRepository.save(existingSubject);
        }

        return null;
    }

    @Override
    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
}