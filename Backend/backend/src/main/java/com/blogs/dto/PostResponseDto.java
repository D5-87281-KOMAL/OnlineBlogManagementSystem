package com.blogs.dto;

import lombok.Data;
import java.util.List;

@Data
public class PostResponseDto {
    private List<BlogPostResDTO> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}