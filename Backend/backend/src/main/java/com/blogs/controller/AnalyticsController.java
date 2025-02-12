//package com.blogs.controller;
//
//
//import com.blogs.entity.Analytics;
//import com.blogs.service.interf.AnalyticsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/analytics")
//public class AnalyticsController {
//
//    @Autowired
//    private AnalyticsService analyticsService;
//
//    @GetMapping("/{postId}")
//    public Analytics getAnalytics(@PathVariable Long postId) {
//        return analyticsService.getAnalyticsByPostId(postId);
//    }
//
//    @PostMapping("/{postId}/increment-views")
//    public void incrementViews(@PathVariable Long postId) {
//        analyticsService.incrementViews(postId);
//    }
//
//    @PostMapping("/{postId}/increment-likes")
//    public void incrementLikes(@PathVariable Long postId) {
//        analyticsService.incrementLikes(postId);
//    }
//
//    @PostMapping("/{postId}/increment-shares")
//    public void incrementShares(@PathVariable Long postId) {
//        analyticsService.incrementShares(postId);
//    }
//
//    @PostMapping("/{postId}/increment-comments")
//    public void incrementComments(@PathVariable Long postId) {
//        analyticsService.incrementComments(postId);
//    }
//}




package com.blogs.controller;

import com.blogs.dto.AnalyticsRequestDTO;
import com.blogs.dto.AnalyticsResponseDTO;
import com.blogs.service.interf.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/{postId}")
    public AnalyticsResponseDTO getAnalytics(@PathVariable Long postId) {
        return analyticsService.getAnalyticsByPostId(postId);
    }

    @PostMapping("/increment-views")
    public void incrementViews(@RequestBody AnalyticsRequestDTO requestDTO) {
        analyticsService.incrementViews(requestDTO.getPostId());
    }

    @PostMapping("/toggle-like")
    public void toggleLike(@RequestBody AnalyticsRequestDTO requestDTO) {
        analyticsService.toggleLike(requestDTO.getPostId(), requestDTO.getUserId());
    }

    @PostMapping("/increment-shares")
    public void incrementShares(@RequestBody AnalyticsRequestDTO requestDTO) {
        analyticsService.incrementShares(requestDTO.getPostId());
    }

    @PostMapping("/increment-comments")
    public void incrementComments(@RequestBody AnalyticsRequestDTO requestDTO) {
        analyticsService.incrementComments(requestDTO.getPostId());
    }
}