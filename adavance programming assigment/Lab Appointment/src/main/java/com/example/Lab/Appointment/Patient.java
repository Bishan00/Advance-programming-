package com.example.Lab.Appointment;


public class Patient {
    private Long id;
    private String name;
    private String contactInformation;
    private String medicalHistory;

    public Patient() {
        // Default constructor
    }

    public Patient(String name, String contactInformation, String medicalHistory) {
        this.name = name;
        this.contactInformation = contactInformation;
        this.medicalHistory = medicalHistory;
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

    public String getContactInformation() {
        return contactInformation;
    }

    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }
}
