package com.blogs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.entity.Payment;


public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Custom queries if needed
}
