package com.project.spring.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Workplan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String imagePath;

    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image; // This will store the image data


    @OneToMany(mappedBy = "workplan", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DailyRoutine> dailyRoutines;

    // Standard getters and setters


    // Implement getRoutines method
    public List<DailyRoutine> getRoutines() {
        return this.dailyRoutines;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<DailyRoutine> getDailyRoutines() {
        return dailyRoutines;
    }

    public void setDailyRoutines(List<DailyRoutine> dailyRoutines) {
        this.dailyRoutines = dailyRoutines;
    }

   
}
