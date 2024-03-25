package com.icbt.abc.controllers;

import com.icbt.abc.entities.LabAppointment;
import com.icbt.abc.entities.Reports;
import com.icbt.abc.services.LabReportService;
import com.icbt.abc.utilities.FileUploader;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/lab_report_upload")
public class ReportUploadController {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private LabReportService labReportService;
    @PostMapping("/upload")
    public ResponseEntity<String> saveImage(
            @RequestParam("report") MultipartFile[] files,
            @RequestParam("appointmentId") String appointmentId,
            @RequestParam("patientId") String patientId,
            @RequestParam("patientFullName") String patientFullName,
            @RequestParam("patientEmail") String patientEmail,
            @RequestParam("patientDescription") String patientDescription
    ) {
        String uploadDir = patientId;
        for (MultipartFile file : files) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            try {
                if (!file.getContentType().equalsIgnoreCase("application/pdf")) {
                    return new ResponseEntity<>("Only PDF files are allowed", HttpStatus.BAD_REQUEST);
                }
                FileUploader.saveFile(uploadDir, fileName, file);
                labReportService.storeReport(appointmentId, patientId, patientDescription, fileName);
                sendEmail(patientEmail, "File Uploaded Successfully", "Dear "+patientFullName+ ",\n\nHere attached your reports", file);
            } catch (IOException ioException) {
                return new ResponseEntity<>("Failed to save file", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>("Files uploaded successfully", HttpStatus.OK);
    }

    private void sendEmail(String to, String subject, String text, MultipartFile file) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            helper.addAttachment(file.getOriginalFilename(), file);
            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/get_all_report_details/{userId}")
    public List<Reports> getAllReportDetails(@PathVariable Integer userId) {
        List<Reports> reportsList = labReportService.getAllReportDetailsAccordingToUserId(userId);
        return reportsList;
    }

    @GetMapping("/get_all_report_details")
    public List<Reports> getAllReportDetails() {
        List<Reports> reportsList = labReportService.getAllReportDetails();
        return reportsList;
    }

    @GetMapping("/get_reports/{userId}")
    public List<String> getFilePaths(@PathVariable Integer userId) {
        String basePath = "D:\\Projects\\ICBT\\ICBT-Lab-Appoinment-System\\src\\main\\resources\\reports\\" + userId;
        File folder = new File(basePath);
        File[] files = folder.listFiles();
        List<String> filePaths = new ArrayList<>();
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    filePaths.add(file.getAbsolutePath());
                }
            }
        }
        return filePaths;
    }

    @GetMapping("/{appointmentId}")
    public Optional<LabAppointment> getLabAppointmentDetails(@PathVariable Integer appointmentId){
        return labReportService.getDetailsFromUserId(appointmentId);
    }
}
