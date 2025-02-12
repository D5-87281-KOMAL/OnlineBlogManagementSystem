package com.blogs.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@Data
public class BlogPostReqDTO {
    private String title;
    private String content;
    private String description;
    private boolean status;
    private Long categoryId; 
    private Long bloggerId;  
    private Long bloggerIdId;
    private List<Long> tagIds;

    private MultipartFile imageData;
}






//package com.blogs.dto;
//
//import lombok.Data;
//import org.springframework.web.multipart.MultipartFile;
//import java.util.List;
//
//@Data
//public class BlogPostReqDTO {
//    private String title;
//    private String content;
//    private String description;
//    private Long categoryId;
//    private Long bloggerId;
//    private List<Long> tagIds;
//    private MultipartFile image; // For file uploads
//}