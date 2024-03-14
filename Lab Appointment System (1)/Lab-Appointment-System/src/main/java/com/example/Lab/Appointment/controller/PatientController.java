package com.example.Lab.Appointment.controller;



import com.example.Lab.Appointment.model.Patient;
import com.example.Lab.Appointment.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RestController
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/api/patients/register")
    public ResponseEntity<String> registerPatient(@Valid @RequestBody Patient patient) {
        patientService.registerPatient(patient);
        return ResponseEntity.ok("Patient registered successfully!");
    }
}
