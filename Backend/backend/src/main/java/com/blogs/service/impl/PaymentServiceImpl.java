package com.blogs.service.impl;


import com.blogs.dto.PaymentRequestDTO;
import com.blogs.dto.PaymentResponseDTO;
import com.blogs.entity.Payment;
import com.blogs.entity.PaymentStatus;
import com.blogs.entity.User;
import com.blogs.repository.PaymentRepository;
import com.blogs.repository.UserRepo;
import com.blogs.service.interf.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepo userRepository;

    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO) {
        User user = userRepository.findById(paymentRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = new Payment();
        payment.setAmount(paymentRequestDTO.getAmount());
        payment.setMethod(paymentRequestDTO.getMethod());
        payment.setStatus(PaymentStatus.PAID.toString());
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUser(user);

        Payment savedPayment = paymentRepository.save(payment);

        return new PaymentResponseDTO();
    }
}
