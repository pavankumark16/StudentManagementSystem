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

import com.example.demo.entity.Attendance;
import com.example.demo.service.AttendanceService;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @PostMapping
    public Attendance saveAttendance(
            @RequestBody Attendance attendance) {

        return attendanceService.saveAttendance(attendance);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @GetMapping
    public List<Attendance> getAllAttendances() {

        return attendanceService.getAllAttendances();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @GetMapping("/{id}")
    public Attendance getAttendanceById(
            @PathVariable Long id) {

        return attendanceService.getAttendanceById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @PutMapping("/{id}")
    public Attendance updateAttendance(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {

        return attendanceService.updateAttendance(id, attendance);
    }
    

    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    @DeleteMapping("/{id}")
    public String deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return "Attendance deleted successfully";
    }
    
    
    
    @GetMapping("/me")
    public List<Attendance> getMyAttendance(Principal principal) {

        return attendanceService.getMyAttendance(
                principal.getName());
    }
    
    
}