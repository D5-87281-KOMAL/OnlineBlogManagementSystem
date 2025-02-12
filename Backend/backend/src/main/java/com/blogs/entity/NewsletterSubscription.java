package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscriptions")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class NewsletterSubscription extends BaseEntity {

    @Column(name = "email", length = 150, nullable = false)
    private String email;

    @Column(name = "subscription_status", length = 20)
    @Enumerated(EnumType.STRING)
    private SubscriptionStatus subscriptionStatus;

    @Column(name = "subscription_date")
    private LocalDateTime subscriptionDate;
}