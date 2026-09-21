package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Faculty;
import com.example.demo.entity.Marks;
import com.example.demo.entity.Student;
import com.example.demo.entity.Subject;
import com.example.demo.entity.User;
import com.example.demo.exception.MarksNotFoundException;
import com.example.demo.repository.FacultyRepository;
import com.example.demo.repository.MarksRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.SubjectRepository;
import com.example.demo.repository.UserRepository;

@Service
public class MarksServiceImpl implements MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Marks saveMarks(Marks marks) {

        Student student = studentRepository
                .findById(marks.getStudent().getStdRollNo())
                .orElseThrow(() ->
                        new RuntimeException("Student not found"));

        Subject subject = subjectRepository
                .findById(marks.getSubject().getId())
                .orElseThrow(() ->
                        new RuntimeException("Subject not found"));


        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();


        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        if (user.getFaculty() == null) {
            throw new RuntimeException(
                    "No faculty is assigned to this user");
        }


        Faculty faculty = facultyRepository
                .findById(user.getFaculty().getId())
                .orElseThrow(() ->
                        new RuntimeException("Faculty not found"));


        marks.setStudent(student);
        marks.setSubject(subject);
        marks.setFaculty(faculty);


        return marksRepository.save(marks);
    }


    @Override
    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }


    @Override
    public Marks getMarksById(Long id) {

        return marksRepository
                .findById(id)
                .orElseThrow(() ->
                        new MarksNotFoundException(
                                "Marks not found"));
    }


    @Override
    public Marks updateMarks(
            Long id,
            Marks marks) {

        Marks existingMarks =
                marksRepository
                        .findById(id)
                        .orElse(null);


        if (existingMarks != null) {

            Student student = studentRepository
                    .findById(
                            marks.getStudent()
                                    .getStdRollNo())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Student not found"));


            Subject subject = subjectRepository
                    .findById(
                            marks.getSubject()
                                    .getId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Subject not found"));


            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            String username =
                    authentication.getName();


            User user = userRepository
                    .findByUsername(username)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"));


            if (user.getFaculty() == null) {
                throw new RuntimeException(
                        "No faculty is assigned to this user");
            }


            Faculty faculty = facultyRepository
                    .findById(
                            user.getFaculty().getId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Faculty not found"));


            existingMarks.setExamType(
                    marks.getExamType());

            existingMarks.setMarks(
                    marks.getMarks());

            existingMarks.setStudent(student);

            existingMarks.setSubject(subject);

            existingMarks.setFaculty(faculty);


            return marksRepository.save(
                    existingMarks);
        }


        return null;
    }


    @Override
    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }
    
    
    
    @Override
    public List<Marks> getMyMarks(String username) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (user.getStudent() == null) {
            throw new RuntimeException(
                    "Student account not linked");
        }

        Long studentId =
                user.getStudent().getStdRollNo();

        return marksRepository
                .findByStudent_StdRollNo(studentId);
    }
    
}