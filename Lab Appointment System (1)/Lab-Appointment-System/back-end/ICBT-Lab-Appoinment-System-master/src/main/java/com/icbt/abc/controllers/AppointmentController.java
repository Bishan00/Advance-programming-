package com.icbt.abc.controllers;

import com.icbt.abc.dtos.AppointmentRequestResponse;
import com.icbt.abc.entities.LabAppointment;
import com.icbt.abc.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/schedule")
    public ResponseEntity<AppointmentRequestResponse> scheduleAppointment(@RequestBody AppointmentRequestResponse scheduleRequest){
        return ResponseEntity.ok(appointmentService.scheduleAppointment(scheduleRequest));
    }

    @GetMapping("/get_all_appointment")
    public List<LabAppointment> getAllAppointment(){
        return appointmentService.getAllAppointment();
    }

    @GetMapping("/get_all_appointment/{userId}")
    public List<LabAppointment> getAllAppointment(@PathVariable Integer userId){
        return appointmentService.getAllAppointmentAccordingToUserId(userId);
    }
}
