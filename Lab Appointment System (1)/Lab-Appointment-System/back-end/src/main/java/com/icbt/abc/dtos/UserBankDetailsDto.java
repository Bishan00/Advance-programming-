package com.icbt.abc.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserBankDetailsDto {

    private Integer userId;
    private String userBankCardType;
    private String userBankCardNumber;
    private String userBankCardHolderName;
    private String userBankCardExpireMonth;
    private String userBankCardExpireDate;
    private String userBankCardExpireYear;
}
