//package com.blogs.repository;
//
//
//
//import com.blogs.entity.Comment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface CommentRepository extends JpaRepository<Comment, Long> {
//    List<Comment> findByBlogpostId(Long postId);
//    List<Comment> findByReplyToId(Long replyToId);
//}




package com.blogs.repository;

import com.blogs.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogpostId(Long postId);
    List<Comment> findByReplyToId(Long replyToId);
    
}


