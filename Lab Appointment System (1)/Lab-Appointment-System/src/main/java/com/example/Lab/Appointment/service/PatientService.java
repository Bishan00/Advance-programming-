package com.example.Lab.Appointment.service;



import com.example.Lab.Appointment.model.Patient;
import com.example.Lab.Appointment.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public void registerPatient(Patient patient) {
        patientRepository.save(patient);
    }
}
