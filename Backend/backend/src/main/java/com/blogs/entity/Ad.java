package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ads")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Ad extends BaseEntity {

    @Column(name = "ad_content", columnDefinition = "TEXT", nullable = false)
    private String adContent;

    @Column(name = "ad_type", length = 50, nullable = false)
    private String adType;

    @Column(name = "target_url", length = 255, nullable = false)
    private String targetUrl;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "status", length = 20)
    @Enumerated(EnumType.STRING)
    private AdStatus status;

    @Column(name = "payment_status", length = 20)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
}