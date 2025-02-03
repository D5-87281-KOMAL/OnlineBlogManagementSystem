package com.blogs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blogs.dto.ApiResponse;
import com.blogs.dto.BlogPostReqDTO;
import com.blogs.entity.BlogPost;
import com.blogs.entity.Category;
import com.blogs.entity.User;
import com.blogs.entity.BlogPostStatus;
import com.blogs.exception.ResourceNotFoundException;
import com.blogs.repository.BlogPostRepo;
import com.blogs.repository.CategoryRepo;
import com.blogs.repository.UserRepo;
import com.blogs.service.interf.BlogPostService;

@Service
@Transactional
public class BlogPostServiceImpl implements BlogPostService {

    @Autowired
    private BlogPostRepo blogPostRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public ApiResponse addNewBlog(BlogPostReqDTO dto) {
        // 1. Fetch Blogger from its ID
        User blogger = userRepo.findById(dto.getBloggerId())
                .orElseThrow(() -> new ResourceNotFoundException("Blogger ID invalid!!"));

        // 2. Fetch Category from its ID
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category ID invalid!!"));

        // 3. Manually map DTO to Entity
        BlogPost blogPostEnt = new BlogPost();
        blogPostEnt.setTitle(dto.getTitle());
        blogPostEnt.setContent(dto.getContent());
        blogPostEnt.setStatus(dto.getStatus() != null ? dto.getStatus() : BlogPostStatus.DRAFT);

        // 4. Set relationships
        blogPostEnt.setBlogger(blogger);
        category.addBlogPost(blogPostEnt); // Adds blog post to category

        // 5. Save the blog post
        blogPostRepo.save(blogPostEnt);

        return new ApiResponse("New blog post added successfully!");
    }
}
