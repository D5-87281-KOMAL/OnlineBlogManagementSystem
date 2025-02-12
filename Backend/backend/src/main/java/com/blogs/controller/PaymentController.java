package com.blogs.controller;


import com.blogs.dto.PaymentRequestDTO;
import com.blogs.dto.PaymentResponseDTO;
import com.blogs.service.interf.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public PaymentResponseDTO processPayment(@RequestBody PaymentRequestDTO paymentRequestDTO) {
        return paymentService.processPayment(paymentRequestDTO);
    }
    
    
   
}
