package com.blogs.dto;

import java.math.BigDecimal;

import com.blogs.entity.PlanType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PaymentRequestDTO {
    private BigDecimal amount;
    private String method;
    private Long userId;
    private PlanType planType;

    // Getters and Setters
}
