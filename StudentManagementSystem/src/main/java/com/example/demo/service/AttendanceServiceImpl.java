package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Attendance;
import com.example.demo.entity.Faculty;
import com.example.demo.entity.Student;
import com.example.demo.entity.Subject;
import com.example.demo.entity.User;
import com.example.demo.exception.AttendanceNotFoundException;
import com.example.demo.repository.AttendanceRepository;
import com.example.demo.repository.FacultyRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.SubjectRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Attendance saveAttendance(Attendance attendance) {

        Student student = studentRepository
                .findById(attendance.getStudent().getStdRollNo())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Subject subject = subjectRepository
                .findById(attendance.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

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

        attendance.setStudent(student);
        attendance.setSubject(subject);
        attendance.setFaculty(faculty);

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new AttendanceNotFoundException(
                                "Attendance not found"));
    }

    @Override
    public Attendance updateAttendance(
            Long id,
            Attendance attendance) {

        Attendance existingAttendance =
                attendanceRepository.findById(id)
                        .orElse(null);

        if (existingAttendance != null) {

            Student student = studentRepository
                    .findById(attendance.getStudent().getStdRollNo())
                    .orElseThrow(() ->
                            new RuntimeException("Student not found"));

            Subject subject = subjectRepository
                    .findById(attendance.getSubject().getId())
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

            existingAttendance.setAttendanceDate(
                    attendance.getAttendanceDate());

            existingAttendance.setStatus(
                    attendance.getStatus());

            existingAttendance.setStudent(student);
            existingAttendance.setSubject(subject);
            existingAttendance.setFaculty(faculty);

            return attendanceRepository.save(existingAttendance);
        }

        return null;
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
    
    @Override
    public List<Attendance> getMyAttendance(String username) {

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

        return attendanceRepository
                .findByStudent_StdRollNo(studentId);
    }
    
    
    
}