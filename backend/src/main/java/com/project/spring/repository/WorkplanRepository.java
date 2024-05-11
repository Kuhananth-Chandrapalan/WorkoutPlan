package com.project.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.spring.model.Workplan;

public interface WorkplanRepository extends JpaRepository<Workplan, Long> {
    

}
