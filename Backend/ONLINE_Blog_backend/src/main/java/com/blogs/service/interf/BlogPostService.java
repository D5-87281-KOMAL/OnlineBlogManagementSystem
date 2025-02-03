package com.blogs.service.interf;

import com.blogs.dto.ApiResponse;
import com.blogs.dto.BlogPostReqDTO;

public interface BlogPostService {
	ApiResponse addNewBlog(BlogPostReqDTO dto);
}
