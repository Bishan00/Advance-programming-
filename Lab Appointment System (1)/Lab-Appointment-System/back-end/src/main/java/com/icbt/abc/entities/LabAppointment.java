package com.icbt.abc.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="lab_appointment")
public class LabAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String userFirstName;
    private String userLastName;
    private String userDateOfBirth;
    private String userGender;
    private String userContactNumber;
    private String userEmail;
    private String userAddress;
    private String userProcedureRequest;
    private String userAdditionalInformation;
}
