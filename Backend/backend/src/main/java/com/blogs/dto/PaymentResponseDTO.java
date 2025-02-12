package com.blogs.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;


@Data
public class PaymentResponseDTO {
    private Long id;
    private BigDecimal amount;
    private String method;
    private String status;
    private LocalDateTime createdAt;

    // Getters and Setters
}