package com.icbt.abc.repositories;

import com.icbt.abc.entities.LabAppointment;
import com.icbt.abc.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepositories extends JpaRepository<LabAppointment, Integer> {
//    Optional<LabAppointment> findByUserId(Integer userId);
    List<LabAppointment> findByUserId(Integer userId);
}
