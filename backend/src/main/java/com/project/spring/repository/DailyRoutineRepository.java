package com.project.spring.repository;

import com.project.spring.model.DailyRoutine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyRoutineRepository extends JpaRepository<DailyRoutine, Long> {
    
}
