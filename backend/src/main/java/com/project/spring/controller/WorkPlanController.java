package com.project.spring.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project.spring.model.DailyRoutine;
import com.project.spring.model.Workplan;
import com.project.spring.repository.WorkplanRepository;

import com.project.spring.dto.WorkplanWithRoutinesDTO;
import com.project.spring.exception.WorkPlanNotFoundException;

import java.util.List;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/workplans")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkPlanController {
    @Autowired
    private WorkplanRepository workplanRepository;
    @Value("${file.storage.location}")
    private String fileStorageLocation;

    

    // Endpoint for creating a work plan with routines (JSON only)
    @PostMapping(value = "/with-routines", consumes = "application/json")
    public ResponseEntity<Workplan> createWorkplanWithRoutines(@RequestBody WorkplanWithRoutinesDTO workplanWithRoutinesDTO) {
        Workplan workplan = new Workplan();
        workplan.setName(workplanWithRoutinesDTO.getName());
        workplanRepository.save(workplan);

        List<DailyRoutine> routines = workplanWithRoutinesDTO.getRoutines().values().stream()
                .map(dto -> {
                    DailyRoutine routine = new DailyRoutine();
                    routine.setDay(dto.getDay());
                    routine.setRoutine(dto.getRoutine());
                    routine.setExercises(dto.getExercises());
                    routine.setSets(dto.getSets());
                    routine.setRepetitions(dto.getRepetitions());
                    routine.setWorkplan(workplan);
                    return routine;
                })
                .collect(Collectors.toList());

        workplan.setDailyRoutines(routines);
        workplanRepository.save(workplan);

        return ResponseEntity.ok(workplan);
    }

    @GetMapping
    public List<Workplan> getAllWorkplans() {
        return workplanRepository.findAll();
    }

    @GetMapping("/{id}")
    public Workplan getWorkplanById(@PathVariable Long id) {
        return workplanRepository.findById(id)
                .orElseThrow(() -> new WorkPlanNotFoundException("Workplan not found with id: " + id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workplan> updateWorkplan(@RequestBody Workplan updatedWorkplan, @PathVariable Long id) {
        Workplan existingWorkplan = workplanRepository.findById(id).orElseThrow(() -> new WorkPlanNotFoundException("Workplan not found with id: " + id));

        existingWorkplan.setName(updatedWorkplan.getName());
        existingWorkplan.getDailyRoutines().clear(); // Clearing existing routines

        for (DailyRoutine routine : updatedWorkplan.getDailyRoutines()) {
            routine.setWorkplan(existingWorkplan); // Ensuring the existing managed workplan is set
            existingWorkplan.getDailyRoutines().add(routine);
        }

        workplanRepository.save(existingWorkplan); // Saving the managed entity
        return ResponseEntity.ok(existingWorkplan);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkplan(@PathVariable Long id) {
        if (!workplanRepository.existsById(id)) {
            throw new WorkPlanNotFoundException("Workplan not found with id: " + id);
        }
        workplanRepository.deleteById(id);
    }

    // Endpoint for creating a work plan with routines and an image (multipart/form-data)
    
    
    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<?> uploadWorkplanImage(@PathVariable Long id, @RequestParam("imageFile") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No image file provided");
            }
    
            Workplan workplan = workplanRepository.findById(id)
                .orElseThrow(() -> new WorkPlanNotFoundException("Workplan not found with id: " + id));
    
            byte[] bytes = file.getBytes();
            workplan.setImage(bytes); // Assuming there's a setImage method handling byte[]
            workplanRepository.save(workplan);
    
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace(); // This will print more detailed error information
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
        }
    }    







@GetMapping("/{id}/image")
public ResponseEntity<byte[]> getWorkplanImage(@PathVariable Long id) {
    Workplan workplan = workplanRepository.findById(id)
        .orElseThrow(() -> new WorkPlanNotFoundException("Workplan not found with id: " + id));

    byte[] imageBytes = workplan.getImage();
    return ResponseEntity.ok()
        .contentType(MediaType.IMAGE_JPEG) // Adjust according to the image type you expect
        .body(imageBytes);
}





}