package com.blogs.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyticsRequestDTO {
    private Long postId;
    private Long userId; // To track which user is liking/unliking the post
}
