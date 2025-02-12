//package com.blogs.controller;
//
//import com.blogs.entity.Subscription;
//import com.blogs.entity.SubscriptionStatus;
//import com.blogs.service.interf.SubscriptionService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/subscriptions")
//public class SubscriptionController {
//
//    private final SubscriptionService subscriptionService;
//
//    @Autowired
//    public SubscriptionController(SubscriptionService subscriptionService) {
//        this.subscriptionService = subscriptionService;
//    }
//
//    @PostMapping
//    public Subscription createSubscription(@RequestBody Subscription subscription) {
//        return subscriptionService.createSubscription(subscription);
//    }
//
//    @PutMapping("/{id}/status")
//    public Subscription updateSubscriptionStatus(@PathVariable Long id, @RequestParam SubscriptionStatus status) {
//        return subscriptionService.updateSubscriptionStatus(id, status);
//    }
//
//    // Endpoint for Stripe to call after successful payment
//    @PostMapping("/payment-success")
//    public String paymentSuccess(@RequestParam Long subscriptionId) {
//        Subscription subscription = subscriptionService.updateSubscriptionStatus(subscriptionId, SubscriptionStatus.ACTIVE);
//        return "Subscription activated: " + subscription.getId();
//    }
//}






package com.blogs.controller;

import com.blogs.dto.SubscriptionRequestDTO;
import com.blogs.dto.SubscriptionResponseDTO;
import com.blogs.service.interf.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    public SubscriptionResponseDTO createSubscription(@RequestBody SubscriptionRequestDTO subscriptionRequestDTO) {
        return subscriptionService.createSubscription(subscriptionRequestDTO);
    }
}
