package com.project.spring.exception;

public class WorkPlanNotFoundException extends RuntimeException {
    public WorkPlanNotFoundException(String message) {
        super(message);
    }

    public WorkPlanNotFoundException(Long id) {
        super("Workplan not found with id: " + id);
    }
}
