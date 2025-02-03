package com.blogs.dto;

 

import com.blogs.entity.BlogPostStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogPostReqDTO {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Content cannot be empty")
    private String content;
    
    @NotNull(message = "Blogger ID is required")
    private Long bloggerId;
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    private BlogPostStatus status; // Status can be DRAFT or PUBLISH
}
