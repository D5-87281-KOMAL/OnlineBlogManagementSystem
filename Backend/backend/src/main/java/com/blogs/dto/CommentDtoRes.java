//package com.blogs.dto;

//import lombok.Data;
//
////import java.time.LocalDateTime;
//
//@Data
//public class CommentDtoRes {
////    private Long id; // Comment ID
//    private String comment; // Comment text
////    private LocalDateTime createdOn; // Timestamp when the comment was created
////    private LocalDateTime updatedOn; // Timestamp when the comment was last updated
//    private Long blogPostId; // ID of the blog post the comment belongs to
//    private Long commenterId; // ID of the user who commented
//    private String commenterName; // Username of the commenter
//    private Long replyToId; // ID of the comment this is replying to (nullable)
//}




package com.blogs.dto;

import java.util.List;

import com.blogs.entity.Comment;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CommentDtoRes {
   
	private Long id;
	private String comment;
    private Long blogPostId;
    private Long commenterId;
    private String commenterName;
    private Long replyToId;
    private List<CommentDtoRes> replies;
    
    public CommentDtoRes(String comment, Long blogPostId, Long commenterId, String commenterName, Long replyToId,  List<CommentDtoRes> replies) {
        this.comment = comment;
        this.blogPostId = blogPostId;
        this.commenterId = commenterId;
        this.commenterName = commenterName;
        this.replyToId = replyToId;
      
        this.replies = replies; // Set the list of replies
    }
    
 public CommentDtoRes(String comment, Long blogPostId, Long commenterId, 
                String commenterName, Long replyToId ) {
this.comment = comment;
this.blogPostId = blogPostId;
this.commenterId = commenterId;
this.commenterName = commenterName;
this.replyToId = replyToId;
 
}

public CommentDtoRes(Long id, String comment, Long blogPostId, Long commenterId, String commenterName, Long replyToId,
		List<CommentDtoRes> replies) {
	super();
	this.id = id;
	this.comment = comment;
	this.blogPostId = blogPostId;
	this.commenterId = commenterId;
	this.commenterName = commenterName;
	this.replyToId = replyToId;
	this.replies = replies;
}
	 
    

}