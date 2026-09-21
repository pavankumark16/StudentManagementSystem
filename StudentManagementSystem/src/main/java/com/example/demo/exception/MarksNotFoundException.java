package com.example.demo.exception;

public class MarksNotFoundException extends RuntimeException {

    public MarksNotFoundException(String message) {
        super(message);
    }
}