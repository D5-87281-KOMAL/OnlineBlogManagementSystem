package com.blogs.controller;

import com.blogs.dto.BlogPostReqDTO;
import com.blogs.dto.BlogPostResDTO;
import com.blogs.service.interf.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/blogposts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping
    public ResponseEntity<BlogPostResDTO> createBlogPost(@ModelAttribute BlogPostReqDTO blogPostDTO,@RequestParam(name = "imageData", required = false) MultipartFile file) {
        BlogPostResDTO responseDTO = blogPostService.createBlogPost(blogPostDTO,file);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
    
    
   

//    @PutMapping("/{id}")
//    public ResponseEntity<BlogPostResDTO> updateBlogPost(@PathVariable Long id, @ModelAttribute BlogPostReqDTO blogPostDTO,@RequestParam(name = "imageData", required = false) MultipartFile file) {
//        BlogPostResDTO responseDTO = blogPostService.updateBlogPost(id, blogPostDTO,file);
//        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
//    }
    	
    
    @PutMapping("/{id}")
    public ResponseEntity<BlogPostResDTO> updateBlogPost(@PathVariable Long id, @ModelAttribute BlogPostReqDTO blogPostDTO, @RequestParam(name = "imageData", required = false) MultipartFile file) {
        BlogPostResDTO responseDTO = blogPostService.updateBlogPost(id, blogPostDTO, file);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteBlogPost(@PathVariable Long id) {
        blogPostService.softDeleteBlogPost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    
    @GetMapping("/user/{userId}")
    public ResponseEntity<BlogPostResDTO> getBlogPostById(@PathVariable Long userId) {
        BlogPostResDTO responseDTO = blogPostService.getBlogPostById(userId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<BlogPostResDTO>> getBlogPostByIdAllBlogPost(@PathVariable Long userId) {
        List<BlogPostResDTO> responseDTOs = blogPostService.getBlogPostByIdAllBlogPost(userId);
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }



    @GetMapping("/get")
    public ResponseEntity<List<BlogPostResDTO>> getAllBlogPosts() {
        List<BlogPostResDTO> responseDTOs = blogPostService.getAllBlogPosts();
        return new ResponseEntity<>(responseDTOs, HttpStatus.OK);
    }
    
 
}



