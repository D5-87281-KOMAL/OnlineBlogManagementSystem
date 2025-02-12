package com.blogs.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.entity.BlogPost;

public interface BlogPostDao extends JpaRepository<BlogPost, Long> {

}
