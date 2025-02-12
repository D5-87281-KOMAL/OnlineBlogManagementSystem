package com.blogs.service.interf;

import com.blogs.dto.SubscriptionRequestDTO;
import com.blogs.dto.SubscriptionResponseDTO;
import com.blogs.entity.Subscription;
import com.blogs.entity.SubscriptionStatus;

public interface SubscriptionService {
    SubscriptionResponseDTO createSubscription(SubscriptionRequestDTO subscriptionRequestDTO);
    Subscription updateSubscriptionStatus(Long subscriptionId, SubscriptionStatus status);
}
