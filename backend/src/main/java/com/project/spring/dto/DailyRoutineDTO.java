// DailyRoutineDTO.java

package com.project.spring.dto;

public class DailyRoutineDTO {
    private Long workplanId;
    private String day;
    private String routine;
    private String exercises;
    private String sets;
    private String repetitions;

    public DailyRoutineDTO() {
    }

    public DailyRoutineDTO(Long workplanId, String day, String routine, String exercises, String sets, String repetitions) {
        this.workplanId = workplanId;
        this.day = day;
        this.routine = routine;
        this.exercises = exercises;
        this.sets = sets;
        this.repetitions = repetitions;
    }

    public Long getWorkplanId() {
        return workplanId;
    }

    public void setWorkplanId(Long workplanId) {
        this.workplanId = workplanId;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getRoutine() {
        return routine;
    }

    public void setRoutine(String routine) {
        this.routine = routine;
    }

    public String getExercises() {
        return exercises;
    }

    public void setExercises(String exercises) {
        this.exercises = exercises;
    }

    public String getSets() {
        return sets;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }

    public String getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(String repetitions) {
        this.repetitions = repetitions;
    }
}
