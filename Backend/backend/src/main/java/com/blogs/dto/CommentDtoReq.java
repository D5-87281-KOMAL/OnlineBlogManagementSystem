//package com.blogs.dto;
//
//
//import lombok.Data;
//
//@Data
//public class CommentDTO {
//    private Long id;
//    private String comment;
//    private Long commenterId;
//    private Long blogPostId;
//    private Long replyToId;
//}






package com.blogs.dto;

import lombok.Data;

@Data
public class CommentDtoReq {
    private String comment;
    private Long blogPostId;
    private Long commenterId;
    private Long replyToId;
}


//package com.blogs.dto;
//
//import lombok.Data;
//
//@Data
//public class CommentDtoReq {
//    private String comment; // The comment text
//    private Long blogPostId; // ID of the blog post the comment belongs to
//    private Long commenterId; // ID of the user who is commenting
//    private Long replyToId; // ID of the comment this is replying to (nullable)
//}