package com.blogs.service.impl;

import com.blogs.dto.BlogPostReqDTO;
import com.blogs.dto.BlogPostResDTO;
import com.blogs.entity.*;
import com.blogs.exception.CustomException;
import com.blogs.exception.ResourceNotFoundException;
import com.blogs.repository.*;
import com.blogs.service.interf.BlogPostService;
import com.blogs.service.interf.FileService;

import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BlogPostServiceImpl implements BlogPostService {

    @Autowired
    private BlogPostRepo blogPostRepository;

    @Autowired
    private CategoryRepo categoryRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private TagRepo tagRepository;
    
    @Autowired
	private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;
    
    
    
    
    @Override
    public BlogPostResDTO createBlogPost(BlogPostReqDTO blogPostDTO, MultipartFile file) {
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(blogPostDTO.getTitle());
        blogPost.setContent(blogPostDTO.getContent());
        blogPost.setDescription(blogPostDTO.getDescription());
        blogPost.setStatus(blogPostDTO.isStatus());

        // Set category
        Category category = categoryRepository.findById(blogPostDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + blogPostDTO.getCategoryId()));
        blogPost.setBlogCategory(category);

        // Set blogger
        User blogger = userRepository.findById(blogPostDTO.getBloggerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + blogPostDTO.getBloggerId()));
        blogPost.setBlogger(blogger);

        // Set tags
        List<Tag> tags = tagRepository.findAllById(blogPostDTO.getTagIds());
        blogPost.setTags(tags);

        // Handle image upload
        if (file != null && !file.isEmpty()) {
            if (fileService.isImageWithValidExtension(file)) {
                try {
                    blogPost.setImageData(file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Failed to process image file", e);
                }
            } else {
                throw new IllegalArgumentException("Invalid image file format. Only PNG, JPG, and JPEG are allowed.");
            }
        }

        // Save the new blog post
        BlogPost savedBlogPost = blogPostRepository.save(blogPost);

        // Convert to DTO and return
        return mapToBlogPostResDTO(savedBlogPost);
    }
    
    
    
    
//    @Override
//    public BlogPostResDTO updateBlogPost(Long id, BlogPostReqDTO blogPostDTO, MultipartFile file) {
//        BlogPost blogPost = blogPostRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));
//        
////        if (blogPostDTO.getTitle() == null || blogPostDTO.getTitle().isEmpty()) {
////            throw new IllegalArgumentException("Title must not be null or empty");
////        }
//
//        // Update basic fields
//        blogPost.setTitle(blogPostDTO.getTitle());
//        blogPost.setContent(blogPostDTO.getContent());
//        blogPost.setDescription(blogPostDTO.getDescription());
////        blogPost.setStatus(blogPostDTO.isStatus());
//
//        // Update category
//        Category category = categoryRepository.findById(blogPostDTO.getCategoryId())
//                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + blogPostDTO.getCategoryId()));
//        blogPost.setBlogCategory(category);
//
//        // Update blogger
//        User blogger = userRepository.findById(blogPostDTO.getBloggerId())
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + blogPostDTO.getBloggerId()));
//        blogPost.setBlogger(blogger);
//
//        // Update tags
//        List<Tag> tags = tagRepository.findAllById(blogPostDTO.getTagIds());
//        blogPost.setTags(tags);
//
//        // Update image (if provided)
//        if (file != null && !file.isEmpty()) {
//            if (fileService.isImageWithValidExtension(file)) {
//                try {
//                    blogPost.setImageData(file.getBytes());
//                } catch (IOException e) {
//                    throw new RuntimeException("Failed to process image file", e);
//                }
//            } else {
//                throw new IllegalArgumentException("Invalid image file format. Only PNG, JPG, and JPEG are allowed.");
//            }
//        }
//
//        // Save the updated blog post
//        BlogPost updatedBlogPost = blogPostRepository.save(blogPost);
//
//        // Convert to DTO and return
//        return mapToBlogPostResDTO(updatedBlogPost);
//    }
    
    
    
    @Override
    public BlogPostResDTO updateBlogPost(Long id, BlogPostReqDTO blogPostDTO, MultipartFile file) {
        // Fetch the existing blog post
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));

        // Update basic fields
        blogPost.setTitle(blogPostDTO.getTitle());
        blogPost.setContent(blogPostDTO.getContent());
        blogPost.setDescription(blogPostDTO.getDescription());
        blogPost.setStatus(blogPostDTO.isStatus());

        // Update category
        Category category = categoryRepository.findById(blogPostDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + blogPostDTO.getCategoryId()));
        blogPost.setBlogCategory(category);

        // Update blogger
        User blogger = userRepository.findById(blogPostDTO.getBloggerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + blogPostDTO.getBloggerId()));
        blogPost.setBlogger(blogger);

        // Update tags
        List<Tag> tags = tagRepository.findAllById(blogPostDTO.getTagIds());
        blogPost.setTags(tags);

        // Update image (if provided)
        if (file != null && !file.isEmpty()) {
            if (fileService.isImageWithValidExtension(file)) {
                try {
                    blogPost.setImageData(file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Failed to process image file", e);
                }
            } else {
                throw new IllegalArgumentException("Invalid image file format. Only PNG, JPG, and JPEG are allowed.");
            }
        }

        // Save the updated blog post
        BlogPost updatedBlogPost = blogPostRepository.save(blogPost);

        // Convert to DTO and return
        return mapToBlogPostResDTO(updatedBlogPost);
    }
    
    

    private BlogPostResDTO mapToBlogPostResDTO(BlogPost blogPost) {
        BlogPostResDTO dto = new BlogPostResDTO();
        dto.setId(blogPost.getId());
        dto.setTitle(blogPost.getTitle());
        dto.setContent(blogPost.getContent());
        dto.setDescription(blogPost.getDescription());
        dto.setImageData(blogPost.getImageData());
        dto.setCategoryName(blogPost.getBlogCategory().getCategoryName());
        dto.setBloggerName(blogPost.getBlogger().getName());
        dto.setBloggerId(blogPost.getBlogger().getId());
        dto.setStatus(blogPost.isStatus());
        dto.setCreatedOn(blogPost.getCreatedOn());
        dto.setUpdatedOn(blogPost.getUpdatedOn());
        dto.setTags(blogPost.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        return dto;
    }

   
    @Override
    public void softDeleteBlogPost(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost", "id", id));
        blogPost.setStatus(false); // Assuming false means soft deleted
        blogPostRepository.save(blogPost);
    }

    
    
    @Override
    public BlogPostResDTO getBlogPostById(Long id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));
        return mapToBlogPostResDTO(blogPost);
    }
    
    
    
    @Override
    public List<BlogPostResDTO> getBlogPostByIdAllBlogPost(Long bloggerId) {
        List<BlogPost> blogPosts = blogPostRepository.findByBlogger_Id(bloggerId);
        return blogPosts.stream()
                .map(this::mapToBlogPostResDTO) // Use the existing DTO mapping method
                .collect(Collectors.toList());
    }

    @Override
    public List<BlogPostResDTO> getAllBlogPosts() {
        List<BlogPost> blogPosts = blogPostRepository.findByStatus(true);
        return blogPosts.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private BlogPostResDTO mapToResponseDTO(BlogPost blogPost) {
        BlogPostResDTO responseDTO = modelMapper.map(blogPost, BlogPostResDTO.class);
        responseDTO.setCategoryName(blogPost.getBlogCategory().getCategoryName());
        responseDTO.setBloggerName(blogPost.getBlogger().getName());
        responseDTO.setBloggerId(blogPost.getBlogger().getId()); // Add this line
        responseDTO.setTags(blogPost.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        return responseDTO;
    }

   

}









