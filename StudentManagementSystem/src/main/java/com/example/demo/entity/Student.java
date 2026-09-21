package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name="students")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stdRollNo;
	
	@NotBlank(message = "First name is required")
	private String firstName;
	
	private String middleName;
	
	@NotBlank(message = "Last name is required")
	private String lastName;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Enter a valid email")
	private String stdEmail;
	
	@Min(value = 16, message = "Minimum age is 15")
	@Max(value = 60, message = "Maximum age is 90")
	private Integer age;
	
	@NotBlank(message = "Gender is required")
	private String gender;
	
	@Pattern(
		    regexp = "^[0-9]{10}$",
		    message = "Phone must contain exactly 10 digits"
		)
		private String phone;
	
	@NotBlank(message = "Address is required")
	private String address;
	
	@ManyToOne
	@JoinColumn(name = "department_id")
	private Department department;

	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;

	private LocalDate joiningDate;

	private LocalDate leavingDate;
	
	
	public Student() {
		
	}  
	
	public Student(Long stdRollNo, String firstName,
			String middleName, String lastName,
			String stdEmail, Course course, Integer age,
           String phone, String gender,
            String address, LocalDate joiningDate,
            LocalDate leavingDate) {

 this.stdRollNo = stdRollNo;
 this.firstName = firstName;
 this.middleName = middleName;
 this.lastName = lastName;
 this.stdEmail = stdEmail;
 this.course = course;
 this.age = age;
 this.phone = phone;
 this.gender = gender;
 this.address = address;
 this.joiningDate = joiningDate;
 this.leavingDate = leavingDate; 
 
}

	
	public Long getStdRollNo() {
		return stdRollNo;
	}

	public void setStdRollNo(Long stdRollNo) {
		this.stdRollNo = stdRollNo;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getStdEmail() {
		return stdEmail;
	}

	public void setStdEmail(String stdEmail) {
		this.stdEmail = stdEmail;
	}

	public Course getCourse() {
	    return course;
	}

	public void setCourse(Course course) {
	    this.course = course;
	}

	public Integer getAge() {
	    return age;
	}

	public void setAge(Integer age) {
	    this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}	

	public LocalDate getJoiningDate() {
	    return joiningDate;
	}

	public void setJoiningDate(LocalDate joiningDate) {
	    this.joiningDate = joiningDate;
	}

	public LocalDate getLeavingDate() {
	    return leavingDate;
	}

	public void setLeavingDate(LocalDate leavingDate) {
	    this.leavingDate = leavingDate;
	}
		
	
	
	public Department getDepartment() {
	    return department;
	}

	public void setDepartment(Department department) {
	    this.department = department;
	}
	
	

}
