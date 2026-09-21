package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Attendance;

public interface AttendanceService {

    Attendance saveAttendance(Attendance attendance);

    List<Attendance> getAllAttendances();

    Attendance getAttendanceById(Long id);

    Attendance updateAttendance(Long id, Attendance attendance);

    void deleteAttendance(Long id);
    
    List<Attendance> getMyAttendance(String username);
}