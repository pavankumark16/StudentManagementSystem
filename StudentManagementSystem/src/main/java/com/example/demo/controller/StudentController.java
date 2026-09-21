package com.example.demo.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public Student saveStudent(@Valid @RequestBody Student student){

	    return studentService.saveStudent(student);

	}
	
	@GetMapping
	public List<Student> getAllStudents(){

	    return studentService.getAllStudents();

	}
	
	@GetMapping("/{id}")
	public Student getStudentById(@PathVariable Long id){

	    return studentService.getStudentById(id);

	}
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public Student updateStudent(
	        @PathVariable Long id,
	        @Valid @RequestBody Student student){

	    return studentService.updateStudent(id,student);

	}
	 
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public String deleteStudent(@PathVariable Long id){

	    studentService.deleteStudent(id);

	    return "Student Deleted Successfully";
	}
	
	
	@GetMapping("/me")
	public Student getMyProfile(Principal principal) {

	    User user = userRepository.findByUsername(principal.getName())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (user.getStudent() == null) {
	        throw new RuntimeException("Student account not linked");
	    }

	    return user.getStudent();
	}
	
	
}