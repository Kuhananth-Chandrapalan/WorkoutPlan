// WorkplanWithRoutinesDTO.java

package com.project.spring.dto;

import java.util.Map;

public class WorkplanWithRoutinesDTO {
    private String name;
    private Map<String, DailyRoutineDTO> routines;

    public WorkplanWithRoutinesDTO() {
    }

    public WorkplanWithRoutinesDTO(String name, Map<String, DailyRoutineDTO> routines) {
        this.name = name;
        this.routines = routines;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, DailyRoutineDTO> getRoutines() {
        return routines;
    }

    public void setRoutines(Map<String, DailyRoutineDTO> routines) {
        this.routines = routines;
    }
}
