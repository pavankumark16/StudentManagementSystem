package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Course;
import com.example.demo.exception.CourseNotFoundException;
import com.example.demo.repository.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found"));
    }

    @Override
    public Course updateCourse(Long id, Course course) {

        Course existingCourse = courseRepository.findById(id).orElse(null);

        if (existingCourse != null) {

            existingCourse.setName(course.getName());
            existingCourse.setDuration(course.getDuration());

            return courseRepository.save(existingCourse);
        }

        return null;
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}