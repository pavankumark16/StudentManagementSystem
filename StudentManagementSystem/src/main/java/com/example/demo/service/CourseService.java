package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Course;

public interface CourseService {

    Course saveCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseById(Long id);

    Course updateCourse(Long id, Course course);

    void deleteCourse(Long id);
}