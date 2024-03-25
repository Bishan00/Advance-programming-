package com.icbt.abc.services;

import com.icbt.abc.dtos.UserBankDetailsDto;
import com.icbt.abc.entities.UserBankDetails;
import com.icbt.abc.repositories.UserBankDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserBankDetailsService {
    @Autowired
    private UserBankDetailsRepository userBankDetailsRepository;

    @Transactional()
    public UserBankDetailsDto getUserBankDetails(Integer userId) {
        UserBankDetails bankDetails = userBankDetailsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Bank details not found for user with ID: " + userId));

        UserBankDetailsDto bankDetailsDTO = new UserBankDetailsDto();
        BeanUtils.copyProperties(bankDetails, bankDetailsDTO);
        return bankDetailsDTO;
    }

    @Transactional
    public void saveUserBankDetails(UserBankDetailsDto bankDetailsDTO) {
        UserBankDetails bankDetails = new UserBankDetails();
        BeanUtils.copyProperties(bankDetailsDTO, bankDetails);
        userBankDetailsRepository.save(bankDetails);
    }

    @Transactional
    public ResponseEntity<String> updateUserBankDetails(String userId, UserBankDetailsDto bankDetailsDTO) {
        try {
            Optional<UserBankDetails> optionalBankDetails = userBankDetailsRepository.findById(Integer.parseInt(userId));

            if (optionalBankDetails.isPresent()) {
                UserBankDetails existingBankDetails = optionalBankDetails.get();

                existingBankDetails.setUserBankCardNumber(bankDetailsDTO.getUserBankCardNumber());
                existingBankDetails.setUserBankCardType(bankDetailsDTO.getUserBankCardType());
                existingBankDetails.setUserBankCardExpireYear(bankDetailsDTO.getUserBankCardExpireYear());
                existingBankDetails.setUserBankCardExpireMonth(bankDetailsDTO.getUserBankCardExpireMonth());
                existingBankDetails.setUserBankCardExpireDate(bankDetailsDTO.getUserBankCardExpireDate());
                existingBankDetails.setUserBankCardHolderName(bankDetailsDTO.getUserBankCardHolderName());

                userBankDetailsRepository.save(existingBankDetails);

                return new ResponseEntity<>("Bank details updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Bank details not found for the user", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating bank details: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
