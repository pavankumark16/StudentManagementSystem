package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Subject;

public interface SubjectService {

    Subject saveSubject(Subject subject);

    List<Subject> getAllSubjects();

    Subject getSubjectById(Long id);

    Subject updateSubject(Long id, Subject subject);

    void deleteSubject(Long id);
}