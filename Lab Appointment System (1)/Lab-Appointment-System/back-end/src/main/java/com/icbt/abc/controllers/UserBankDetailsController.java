package com.icbt.abc.controllers;

import com.icbt.abc.dtos.UserBankDetailsDto;
import com.icbt.abc.services.UserBankDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank-details")
public class UserBankDetailsController {
    @Autowired
    private UserBankDetailsService userBankDetailsService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserBankDetails(@PathVariable Integer userId) {
        try {
            UserBankDetailsDto bankDetailsDTO = userBankDetailsService.getUserBankDetails(userId);
            return ResponseEntity.ok(bankDetailsDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Bank details not found for user with ID: " + userId);
        }
    }

    @PostMapping
    public ResponseEntity<String> saveUserBankDetails(@RequestBody UserBankDetailsDto bankDetailsDTO) {
        userBankDetailsService.saveUserBankDetails(bankDetailsDTO);
        return new ResponseEntity<>("Bank details saved successfully", HttpStatus.CREATED);
    }

    @PutMapping("/update_bank_details/{userId}")
    public ResponseEntity<String> updateUserBankDetails(@PathVariable String userId,@RequestBody UserBankDetailsDto bankDetailsDTO) {
        userBankDetailsService.updateUserBankDetails(userId, bankDetailsDTO);
        return new ResponseEntity<>("Bank details updated successfully", HttpStatus.CREATED);
    }
}
