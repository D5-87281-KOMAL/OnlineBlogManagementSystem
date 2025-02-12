package com.blogs.repository;

import com.blogs.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogPostRepo extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByBlogger_Id(Long bloggerId);
    List<BlogPost> findByStatus(boolean status);
}




//package com.blogs.repository;

//import com.blogs.entity.BlogPost;
//import com.blogs.entity.Category;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//import java.util.Optional;
//
//public interface BlogPostRepo extends JpaRepository<BlogPost, Long> {
//    List<BlogPost> findByBlogger_Id(Long bloggerId);
//    List<BlogPost> findByBlogCategory_Id(Long categoryId);
//	Page<BlogPost> findByBlogCategory(Category foundCategory, PageRequest pageable);
//	Page<BlogPost> findStatus(boolean b);
//}