package com.icbt.abc.services;

import com.icbt.abc.dtos.AppointmentRequestResponse;
import com.icbt.abc.entities.LabAppointment;
import com.icbt.abc.repositories.AppointmentRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppointmentService {

    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepositories appointmentRepositories;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public AppointmentRequestResponse scheduleAppointment(AppointmentRequestResponse scheduleAppointmentRequest){
        AppointmentRequestResponse resp = new AppointmentRequestResponse();
        try {
            LabAppointment appointment = new LabAppointment();
            appointment.setUserId(scheduleAppointmentRequest.getUserId());
            appointment.setUserFirstName(scheduleAppointmentRequest.getUserFirstName());
            appointment.setUserLastName(scheduleAppointmentRequest.getUserLastName());
            appointment.setUserDateOfBirth(scheduleAppointmentRequest.getUserDateOfBirth());
            appointment.setUserGender(scheduleAppointmentRequest.getUserGender());
            appointment.setUserContactNumber(scheduleAppointmentRequest.getUserContactNumber());
            appointment.setUserEmail(scheduleAppointmentRequest.getUserEmail());
            appointment.setUserAddress(scheduleAppointmentRequest.getUserAddress());
            appointment.setUserProcedureRequest(scheduleAppointmentRequest.getUserProcedureRequest());
            appointment.setUserAdditionalInformation(scheduleAppointmentRequest.getUserAdditionalInformation());



            Map<String, Object> templateData = new HashMap<>();
            templateData.put("firstName", scheduleAppointmentRequest.getUserFirstName());
            templateData.put("appointmentDate", "2024-03-16");
            templateData.put("appointmentTime", "10:00 AM");
            templateData.put("appointmentLocation", "ABC Clinic");

            sendEmailWithTemplate(scheduleAppointmentRequest.getUserEmail(), "Appointment Confirmation", "scheduled_appointment", templateData);

            appointmentRepositories.save(appointment);
            resp.setMessage("Appointment scheduled Successfully");
            resp.setStatusCode(200);
        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    private void sendEmailWithTemplate(String to, String subject, String templateName, Map<String, Object> templateData) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            String content = buildTemplate(templateName, templateData);
            messageHelper.setText(content, true);
        };

        try {
            emailSender.send(messagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

    private String buildTemplate(String templateName, Map<String, Object> templateData) {
        Context context = new Context();
        context.setVariables(templateData);
        return templateEngine.process(templateName, context);
    }

    public List<LabAppointment> getAllAppointment(){
        return appointmentRepositories.findAll();
    }

    public List<LabAppointment> getAllAppointmentAccordingToUserId(Integer userId){
        return appointmentRepositories.findByUserId(userId);
    }
}
