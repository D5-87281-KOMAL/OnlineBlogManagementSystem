package com.blogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.dto.ApiResponse;
import com.blogs.dto.BlogPostReqDTO;
import com.blogs.service.interf.BlogPostService;

 

@RestController
@RequestMapping("/posts")
public class BlogPostController {
	// depcy - blog post service i/f
	@Autowired
	private BlogPostService blogPostService;

	public BlogPostController() {
		System.out.println("in ctor " + getClass());
	}

	/*
	 * Desc Add new Blog Post URL - http://host:port/posts Method - POST payload -
	 * BlogPostReqDTO (category Id , author id , title content , desc) Successful
	 * Resp - SC 201 + mesg (ApiResponse) Error resp - SC 400 , error mesg -wrapped
	 * in DTO(ApiResponse)
	 */
	@PostMapping
	public ResponseEntity<?> addNewBlogPost(@RequestBody 
			BlogPostReqDTO dto) {
		System.out.println("in add blog post " + dto);
		// invoke service layer method
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
			.body(blogPostService.addNewBlog(dto));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
		}
	}

}
