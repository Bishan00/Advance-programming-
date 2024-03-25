package com.icbt.abc.repositories;

import com.icbt.abc.entities.UserBankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserBankDetailsRepository extends JpaRepository<UserBankDetails, Integer> {
    Optional<UserBankDetails> findByUserId(Integer userId);
}
