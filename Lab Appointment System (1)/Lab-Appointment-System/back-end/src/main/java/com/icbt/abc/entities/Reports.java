package com.icbt.abc.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="lab_reports")
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer appointmentId;
    private Integer userId;
    private String reportPath;
    private String description;
}
