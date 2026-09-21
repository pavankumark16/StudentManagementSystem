package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Course;
import com.example.demo.entity.Department;
import com.example.demo.entity.Student;
import com.example.demo.exception.StudentNotFoundException;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.MarksRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private MarksRepository markRepository;
	
	@Override
	public Student saveStudent(Student student) {

	    Department department = departmentRepository
	            .findById(student.getDepartment().getId())
	            .orElseThrow(() -> new RuntimeException("Department not found"));

	    Course course = courseRepository
	            .findById(student.getCourse().getId())
	            .orElseThrow(() -> new RuntimeException("Course not found"));

	    student.setDepartment(department);
	    student.setCourse(course);

	    return studentRepository.save(student);
	}

	@Override
	public List<Student> getAllStudents() {
	    return studentRepository.findAll();
	}

	@Override
	public Student getStudentById(Long id) {
	    return studentRepository.findById(id)
	            .orElseThrow(() -> new StudentNotFoundException("Student not found"));
	}

	@Override
	public Student updateStudent(Long id, Student student) {

	    Student existingStudent = studentRepository.findById(id).orElse(null);

	    if (existingStudent != null) {

	        Department department = departmentRepository
	                .findById(student.getDepartment().getId())
	                .orElseThrow(() -> new RuntimeException("Department not found"));

	        Course course = courseRepository
	                .findById(student.getCourse().getId())
	                .orElseThrow(() -> new RuntimeException("Course not found"));

	        existingStudent.setFirstName(student.getFirstName());
	        existingStudent.setMiddleName(student.getMiddleName());
	        existingStudent.setLastName(student.getLastName());
	        existingStudent.setStdEmail(student.getStdEmail());
	        existingStudent.setAge(student.getAge());
	        existingStudent.setGender(student.getGender());
	        existingStudent.setPhone(student.getPhone());
	        existingStudent.setAddress(student.getAddress());
	        existingStudent.setJoiningDate(student.getJoiningDate());
	        existingStudent.setLeavingDate(student.getLeavingDate());

	        existingStudent.setDepartment(department);
	        existingStudent.setCourse(course);

	        return studentRepository.save(existingStudent);
	    }

	    return null;
	} 

	@Override
	@Transactional
	public void deleteStudent(Long id) {

	    studentRepository.findById(id)
	            .orElseThrow(() ->
	                    new StudentNotFoundException("Student not found"));

	    markRepository.deleteByStudent_StdRollNo(id);

	    studentRepository.deleteById(id);
	}
	
	
}