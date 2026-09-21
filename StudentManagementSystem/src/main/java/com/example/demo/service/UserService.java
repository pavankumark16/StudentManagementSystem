package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

    User saveUser(User user);
    
    List<User> getAllUsers();
    
    void changePassword(
            String username,
            String currentPassword,
            String newPassword
    );

}