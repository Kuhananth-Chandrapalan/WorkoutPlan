package com.project.spring.exception;

public class DailyRoutineNotFoundException extends RuntimeException {
    public DailyRoutineNotFoundException(String message) {
        super(message);
    }

    public DailyRoutineNotFoundException(Long id) {
        super("Daily Routine not found with id: " + id);
    }
}
