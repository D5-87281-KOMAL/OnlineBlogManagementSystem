package com.blogs.dto;

import java.time.LocalDateTime;

import com.blogs.entity.PlanType;

import lombok.Data;

@Data
public class SubscriptionRequestDTO {
    private Long userId;
    private PlanType planType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Getters and Setters
}