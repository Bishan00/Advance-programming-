package com.icbt.abc.repositories;


import com.icbt.abc.entities.Reports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Reports, Integer> {
    List<Reports> findByUserId(Integer userId);
}
