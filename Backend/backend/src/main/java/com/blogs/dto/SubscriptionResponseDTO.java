package com.blogs.dto;

import java.time.LocalDateTime;

import com.blogs.entity.PlanType;
import com.blogs.entity.SubscriptionStatus;

import lombok.Data;

@Data


public class SubscriptionResponseDTO {
	public SubscriptionResponseDTO(Long id2, PlanType planType2, LocalDateTime startDate2, LocalDateTime endDate2,
			SubscriptionStatus status2) {
		// TODO Auto-generated constructor stub
	}
	private Long id;
    private PlanType planType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;

    // Getters and Setters
}