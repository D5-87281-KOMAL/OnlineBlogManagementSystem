//package com.blogs.service.impl;
//
//import com.blogs.entity.Analytics;
//import com.blogs.repository.AnalyticsRepository;
//import com.blogs.service.interf.AnalyticsService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AnalyticsServiceImpl implements AnalyticsService {
//
//    @Autowired
//    private AnalyticsRepository analyticsRepository;
//
//    public Analytics getAnalyticsByPostId(Long postId) {
//        return analyticsRepository.findByPostId(postId);
//    }
//
//    public void incrementViews(Long postId) {
//        Analytics analytics = analyticsRepository.findByPostId(postId);
//        if (analytics != null) {
//            analytics.setViews(analytics.getViews() + 1);
//            analyticsRepository.save(analytics);
//        }
//    }
//
//    public void incrementLikes(Long postId) {
//        Analytics analytics = analyticsRepository.findByPostId(postId);
//        if (analytics != null) {
//            analytics.setLikes(analytics.getLikes() + 1);
//            analyticsRepository.save(analytics);
//        }
//    }
//
//    public void incrementShares(Long postId) {
//        Analytics analytics = analyticsRepository.findByPostId(postId);
//        if (analytics != null) {
//            analytics.setShares(analytics.getShares() + 1);
//            analyticsRepository.save(analytics);
//        }
//    }
//
//    public void incrementComments(Long postId) {
//        Analytics analytics = analyticsRepository.findByPostId(postId);
//        if (analytics != null) {
//            analytics.setComments(analytics.getComments() + 1);
//            analyticsRepository.save(analytics);
//        }
//    }
//}






package com.blogs.service.impl;

import com.blogs.dto.AnalyticsResponseDTO;
import com.blogs.entity.Analytics;
import com.blogs.repository.AnalyticsRepository;
import com.blogs.service.interf.AnalyticsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    // Track users who have liked a post
    private final Set<Long> likedUsers = new HashSet<>();

    public AnalyticsResponseDTO getAnalyticsByPostId(Long postId) {
        Analytics analytics = analyticsRepository.findByPostId(postId);
        if (analytics == null) {
            return null;
        }
        return mapToResponseDTO(analytics);
    }

    public void incrementViews(Long postId) {
        Analytics analytics = analyticsRepository.findByPostId(postId);
        if (analytics != null) {
            analytics.setViews(analytics.getViews() + 1);
            analyticsRepository.save(analytics);
        }
    }

    public void toggleLike(Long postId, Long userId) {
        Analytics analytics = analyticsRepository.findByPostId(postId);
        if (analytics != null) {
            if (likedUsers.contains(userId)) {
                // User already liked the post, so remove the like
                analytics.setLikes(analytics.getLikes() - 1);
                likedUsers.remove(userId);
            } else {
                // User is liking the post for the first time
                analytics.setLikes(analytics.getLikes() + 1);
                likedUsers.add(userId);
            }
            analyticsRepository.save(analytics);
        }
    }

    public void incrementShares(Long postId) {
        Analytics analytics = analyticsRepository.findByPostId(postId);
        if (analytics != null) {
            analytics.setShares(analytics.getShares() + 1);
            analyticsRepository.save(analytics);
        }
    }

    public void incrementComments(Long postId) {
        Analytics analytics = analyticsRepository.findByPostId(postId);
        if (analytics != null) {
            analytics.setComments(analytics.getComments() + 1);
            analyticsRepository.save(analytics);
        }
    }

    private AnalyticsResponseDTO mapToResponseDTO(Analytics analytics) {
        AnalyticsResponseDTO responseDTO = new AnalyticsResponseDTO();
        responseDTO.setViews(analytics.getViews());
        responseDTO.setLikes(analytics.getLikes());
        responseDTO.setShares(analytics.getShares());
        responseDTO.setComments(analytics.getComments());
        return responseDTO;
    }

	@Override
	public void incrementLikes(Long postId) {
		// TODO Auto-generated method stub
		
	}
}