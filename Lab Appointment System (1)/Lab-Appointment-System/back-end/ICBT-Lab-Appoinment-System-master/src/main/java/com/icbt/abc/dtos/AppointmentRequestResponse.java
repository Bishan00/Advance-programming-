package com.icbt.abc.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentRequestResponse {
    private int statusCode;
    private String error;
    private String message;
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
