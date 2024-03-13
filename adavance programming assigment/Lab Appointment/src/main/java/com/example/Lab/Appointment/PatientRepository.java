package com.example.Lab.Appointment;

// PatientRepository.java
import java.util.List;

public interface PatientRepository {
    List<Patient> findAll();
    Patient findById(Long id);
    void save(Patient patient);
    void deleteById(Long id);
}
