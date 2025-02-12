//package com.blogs.service.impl;
//
//
//import com.blogs.dto.CommentDTO;
//import com.blogs.entity.Comment;
//import com.blogs.repository.CommentRepository;
//import com.blogs.service.interf.CommentService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//@Service
//public class CommentServiceImpl  implements  CommentService{
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    public List<Comment> getCommentsByPostId(Long postId) {
//        return commentRepository.findByBlogpostId(postId);
//    }
//
//    public Comment addComment(Comment comment) {
//        return commentRepository.save(comment);
//    }
//
//    public List<Comment> getReplies(Long commentId) {
//        return commentRepository.findByReplyToId(commentId);
//    }
//}







//package com.blogs.service.impl;
//
//import com.blogs.dto.CommentDtoReq;
//import com.blogs.dto.CommentDtoRes;
//import com.blogs.entity.Comment;
//import com.blogs.entity.User;
//import com.blogs.entity.BlogPost;
//import com.blogs.repository.CommentRepository;
//import com.blogs.repository.UserRepo;
//import com.blogs.repository.BlogPostRepo;
//import com.blogs.service.interf.CommentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class CommentServiceImpl implements CommentService {
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private UserRepo userRepository;
//
//    @Autowired
//    private BlogPostRepo blogPostRepository;
//
//    @Override
//    public List<CommentDtoRes> getCommentsByPostId(Long postId) {
//        return commentRepository.findByBlogpostId(postId)
//                .stream()
//                .map(this::convertToDtoRes)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public CommentDtoRes addComment(CommentDtoReq commentDtoReq) {
//        // Fetch the blog post and commenter from the database
//        BlogPost blogPost = blogPostRepository.findById(commentDtoReq.getBlogPostId())
//                .orElseThrow(() -> new RuntimeException("Blog post not found"));
//        User commenter = userRepository.findById(commentDtoReq.getCommenterId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Create a new Comment entity
//        Comment comment = new Comment();
//        comment.setComment(commentDtoReq.getComment());
//        comment.setBlogpost(blogPost);
//        comment.setCommenter(commenter);
//
//        // Set replyTo if it exists
//        if (commentDtoReq.getReplyToId() != null) {
//            Comment replyTo = commentRepository.findById(commentDtoReq.getReplyToId())
//                    .orElseThrow(() -> new RuntimeException("Reply-to comment not found"));
//            comment.setReplyTo(replyTo);
//        }
//
//        // Save the comment
//        Comment savedComment = commentRepository.save(comment);
//
//        // Convert the saved comment to DTO and return
//        return convertToDtoRes(savedComment);
//    }
//
//    @Override
//    public List<CommentDtoRes> getReplies(Long commentId) {
//        return commentRepository.findByReplyToId(commentId)
//                .stream()
//                .map(this::convertToDtoRes)
//                .collect(Collectors.toList());
//    }
//
//    private CommentDtoRes convertToDtoRes(Comment comment) {
//        CommentDtoRes dtoRes = new CommentDtoRes();
////        dtoRes.setId(comment.getId());
//        dtoRes.setComment(comment.getComment());
////        dtoRes.setCreatedOn(comment.getCreatedOn());
////        dtoRes.setUpdatedOn(comment.getUpdatedOn());
//        dtoRes.setBlogPostId(comment.getBlogpost().getId());
//        dtoRes.setCommenterId(comment.getCommenter().getId());
//        dtoRes.setCommenterName(comment.getCommenter().getName());
//        dtoRes.setReplyToId(comment.getReplyTo() != null ? comment.getReplyTo().getId() : null);
//        return dtoRes;
//    }
//}




package com.blogs.service.impl;

import com.blogs.dto.CommentDtoReq;
import com.blogs.dto.CommentDtoRes;
import com.blogs.entity.BlogPost;
import com.blogs.entity.Comment;
import com.blogs.entity.User;
import com.blogs.repository.BlogPostRepo;
import com.blogs.repository.CommentRepository;
import com.blogs.repository.UserRepo;
import com.blogs.service.interf.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private BlogPostRepo blogPostRepository;

    @Override
    public List<CommentDtoRes> getCommentsByPostId(Long postId) {
        return commentRepository.findByBlogpostId(postId)
                .stream()
                .map(this::convertToDtoRes)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<CommentDtoRes> getAllComments() {
        // Fetch all comments from the database
        List<Comment> comments = commentRepository.findAll();

        // Convert the list of comments to DTOs
        return comments.stream()
                .map(comment -> {
                    // Fetch replies for each comment (make sure to fetch them properly)
                    List<CommentDtoRes> replies = comment.getReplies().stream()
                            .map(reply -> new CommentDtoRes(
                            		 reply.getId(),
                                    reply.getComment(),
                                   
                                    reply.getBlogpost().getId(),
                                    reply.getCommenter().getId(),
                                    reply.getCommenter().getName(),
                                    reply.getReplyTo() != null ? reply.getReplyTo().getId() : null,
                                   
                                    null  // replies for individual replies (could be null here)
                            ))
                            .collect(Collectors.toList());

                    return new CommentDtoRes(
                    		comment.getId(),
                            comment.getComment(),
                            comment.getBlogpost().getId(),
                            comment.getCommenter().getId(),
                            comment.getCommenter().getName(),
                            comment.getReplyTo() != null ? comment.getReplyTo().getId() : null,
                            
                            replies // Include the replies list here
                    );
                })
                .collect(Collectors.toList());
    }



   

    @Override
    public CommentDtoRes addComment(CommentDtoReq commentDtoReq) {
        // Validate that blogPostId and commenterId are not null
        if (commentDtoReq.getBlogPostId() == null) {
            throw new IllegalArgumentException("Blog post ID must not be null");
        }
        if (commentDtoReq.getCommenterId() == null) {
            throw new IllegalArgumentException("User (commenter) ID must not be null");
        }
        if (commentDtoReq.getComment() == null || commentDtoReq.getComment().isEmpty()) {
            throw new IllegalArgumentException("Comment text must not be empty");
        }

        // Retrieve BlogPost entity
        BlogPost blogPost = blogPostRepository.findById(commentDtoReq.getBlogPostId())
                .orElseThrow(() -> new RuntimeException("Blog post not found"));

        // Retrieve User entity
        User commenter = userRepository.findById(commentDtoReq.getCommenterId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create new Comment entity
        Comment comment = new Comment();
        comment.setComment(commentDtoReq.getComment());
        comment.setBlogpost(blogPost);
        comment.setCommenter(commenter);

        // Handle replies (if applicable)
        if (commentDtoReq.getReplyToId() != null) {
            Comment replyTo = commentRepository.findById(commentDtoReq.getReplyToId())
                    .orElseThrow(() -> new RuntimeException("Reply-to comment not found"));
            comment.setReplyTo(replyTo);
        }

        // Save comment and return response DTO
        Comment savedComment = commentRepository.save(comment);
        return convertToDtoRes(savedComment);
    }

    
    @Override
    public void deleteComment(Long commentId) {
        // Check if the comment exists
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId); // Delete the comment by its ID
        } else {
            throw new RuntimeException("Comment not found with ID: " + commentId); // Throw an exception if not found
        }
    }

    @Override
    public List<CommentDtoRes> getReplies(Long commentId) {
        return commentRepository.findByReplyToId(commentId)
                .stream()
                .map(this::convertToDtoRes)
                .collect(Collectors.toList());
    }

    private CommentDtoRes convertToDtoRes(Comment comment) {
        CommentDtoRes dtoRes = new CommentDtoRes();
        dtoRes.setComment(comment.getComment());
        dtoRes.setBlogPostId(comment.getBlogpost().getId());
        dtoRes.setCommenterId(comment.getCommenter().getId());
        dtoRes.setCommenterName(comment.getCommenter().getName());
        dtoRes.setReplyToId(comment.getReplyTo() != null ? comment.getReplyTo().getId() : null);
        return dtoRes;
    }
    
    @Override
    public CommentDtoRes replyToComment(CommentDtoReq replyDtoReq) {
        // Retrieve the blog post and user as usual
        BlogPost blogPost = blogPostRepository.findById(replyDtoReq.getBlogPostId())
                .orElseThrow(() -> new RuntimeException("Blog post not found"));
        User commenter = userRepository.findById(replyDtoReq.getCommenterId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Comment object
        Comment comment = new Comment();
        comment.setComment(replyDtoReq.getComment());
        comment.setBlogpost(blogPost);
        comment.setCommenter(commenter);

        // If it's a reply, set the parent comment (the comment being replied to)
        if (replyDtoReq.getReplyToId() != null) {
            Comment parentComment = commentRepository.findById(replyDtoReq.getReplyToId())
                    .orElseThrow(() -> new RuntimeException("Reply-to comment not found"));
            comment.setReplyTo(parentComment); // Linking the parent comment (replying to it)
        }

        // Save the comment (reply) and return the DTO
        Comment savedComment = commentRepository.save(comment);
        return convertToDtoRes(savedComment);
    }

    
    
    
    
}
