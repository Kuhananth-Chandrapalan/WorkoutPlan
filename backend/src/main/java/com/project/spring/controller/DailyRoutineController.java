package com.project.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.spring.model.DailyRoutine;
import com.project.spring.repository.DailyRoutineRepository;
import com.project.spring.exception.DailyRoutineNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/daily-routines") // RESTful naming convention
@CrossOrigin(origins = "http://localhost:3000")
public class DailyRoutineController {
    @Autowired
    private DailyRoutineRepository dailyRoutineRepository;

    @PostMapping
    public DailyRoutine createDailyRoutine(@RequestBody DailyRoutine newDailyRoutine){
        return dailyRoutineRepository.save(newDailyRoutine);
    }

    @GetMapping
    public List<DailyRoutine> getAllDailyRoutines(){
        return dailyRoutineRepository.findAll();
    }

    @GetMapping("/{id}")
    public DailyRoutine getDailyRoutineById(@PathVariable Long id){
        return dailyRoutineRepository.findById(id)
                .orElseThrow(() -> new DailyRoutineNotFoundException("Daily Routine not found with id: " + id));
    }

    @PutMapping("/{id}")
    public DailyRoutine updateDailyRoutine(@RequestBody DailyRoutine updatedDailyRoutine, @PathVariable Long id){
        return dailyRoutineRepository.findById(id)
                .map(dailyRoutine -> {
                    dailyRoutine.setDay(updatedDailyRoutine.getDay());
                    dailyRoutine.setRoutine(updatedDailyRoutine.getRoutine());
                    dailyRoutine.setExercises(updatedDailyRoutine.getExercises());
                    dailyRoutine.setSets(updatedDailyRoutine.getSets());
                    dailyRoutine.setRepetitions(updatedDailyRoutine.getRepetitions());
                    return dailyRoutineRepository.save(dailyRoutine);
                }).orElseThrow(() -> new DailyRoutineNotFoundException("Daily Routine not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteDailyRoutine(@PathVariable Long id){
        if (!dailyRoutineRepository.existsById(id)) {
            throw new DailyRoutineNotFoundException("Daily Routine not found with id: " + id);
        }
        dailyRoutineRepository.deleteById(id);
    }
}
