package com.example.demo.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Marks;
import com.example.demo.service.MarksService;

@RestController
@RequestMapping("/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @PostMapping
    public Marks saveMarks(@RequestBody Marks marks) {
        return marksService.saveMarks(marks);
    }

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Marks getMarksById(@PathVariable Long id) {
        return marksService.getMarksById(id);
    }

    @PutMapping("/{id}")
    public Marks updateMarks(@PathVariable Long id,
                             @RequestBody Marks marks) {
        return marksService.updateMarks(id, marks);
    }

    @DeleteMapping("/{id}")
    public String deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
        return "Marks deleted successfully";
    }
    
    @GetMapping("/me")
    public List<Marks> getMyMarks(Principal principal) {

        return marksService.getMyMarks(
                principal.getName());
    }
    
    
}