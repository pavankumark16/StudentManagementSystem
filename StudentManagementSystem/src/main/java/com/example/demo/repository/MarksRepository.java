package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Marks;

public interface MarksRepository
        extends JpaRepository<Marks, Long> {

    @Transactional
    void deleteByStudent_StdRollNo(Long studentId);

    List<Marks> findByStudent_StdRollNo(Long studentId);
}