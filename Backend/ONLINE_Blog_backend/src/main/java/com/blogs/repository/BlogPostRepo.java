package com.blogs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.entity.BlogPost;

public interface BlogPostRepo extends JpaRepository<BlogPost, Long> {

}
