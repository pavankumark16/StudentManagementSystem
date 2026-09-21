package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Marks;

public interface MarksService {

    Marks saveMarks(Marks marks);

    List<Marks> getAllMarks();

    Marks getMarksById(Long id);

    Marks updateMarks(Long id, Marks marks);

    void deleteMarks(Long id);

    List<Marks> getMyMarks(String username);
}