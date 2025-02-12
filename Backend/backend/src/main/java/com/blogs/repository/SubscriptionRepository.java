package com.blogs.repository;

import com.blogs.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    // Custom queries if needed
}
