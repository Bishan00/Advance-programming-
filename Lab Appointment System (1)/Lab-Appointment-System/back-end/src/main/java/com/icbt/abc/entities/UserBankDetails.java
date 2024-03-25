package com.icbt.abc.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user_bank_details")
public class UserBankDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String userBankCardType;
    private String userBankCardNumber;
    private String userBankCardHolderName;
    private String userBankCardExpireMonth;
    private String userBankCardExpireDate;
    private String userBankCardExpireYear;
}
