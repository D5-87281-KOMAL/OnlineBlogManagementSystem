package com.blogs.service.impl;

import com.blogs.dto.SubscriptionRequestDTO;
import com.blogs.dto.SubscriptionResponseDTO;
import com.blogs.entity.Subscription;
import com.blogs.entity.SubscriptionStatus;
import com.blogs.entity.User;
import com.blogs.repository.SubscriptionRepository;
import com.blogs.repository.UserRepo;
import com.blogs.service.interf.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

//    private final SubscriptionRepository subscriptionRepository;
//
//    @Autowired
//    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository) {
//        this.subscriptionRepository = subscriptionRepository;
//    }
//
//    @Override
//    public Subscription createSubscription(Subscription subscription) {
//        return subscriptionRepository.save(subscription);
//    }
//
//    @Override
//    public Subscription updateSubscriptionStatus(Long subscriptionId, SubscriptionStatus status) {
//        Subscription subscription = subscriptionRepository.findById(subscriptionId).orElseThrow(() -> new RuntimeException("Subscription not found"));
//        subscription.setStatus(status);
//        return subscriptionRepository.save(subscription);
//    }
	
	
	
	
	@Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepo userRepository;

    public SubscriptionResponseDTO createSubscription(SubscriptionRequestDTO subscriptionRequestDTO) {
        User user = userRepository.findById(subscriptionRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlanType(subscriptionRequestDTO.getPlanType());
        subscription.setStartDate(subscriptionRequestDTO.getStartDate());
        subscription.setEndDate(subscriptionRequestDTO.getEndDate());
        subscription.setStatus(SubscriptionStatus.ACTIVE.toString());

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        return new SubscriptionResponseDTO(savedSubscription.getId(), savedSubscription.getPlanType(), savedSubscription.getStartDate(), savedSubscription.getEndDate(), savedSubscription.getStatus());
    }

	@Override
	public Subscription updateSubscriptionStatus(Long subscriptionId, SubscriptionStatus status) {
		// TODO Auto-generated method stub
		return null;
	}
}

