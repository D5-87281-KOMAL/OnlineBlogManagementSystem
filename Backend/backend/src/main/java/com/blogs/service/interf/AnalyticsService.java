package com.blogs.service.interf;

import com.blogs.dto.AnalyticsResponseDTO;
//import com.blogs.entity.Analytics;

public interface AnalyticsService {
	AnalyticsResponseDTO getAnalyticsByPostId(Long postId);
	void incrementViews(Long postId);
	void incrementComments(Long postId);
	void incrementShares(Long postId) ;
	void incrementLikes(Long postId);
	void toggleLike(Long postId, Long userId);
	

}
