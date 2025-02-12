package com.blogs.dto;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BlogPostResDTO {
    private Long id;
    private String title;
    private String content;
    private String description;
    private byte[] imageData;
    private String categoryName;
    private String bloggerName;
    private Long bloggerId;
    private boolean status;
    private LocalDate createdOn;
    private LocalDateTime updatedOn;
    private List<String> tags;
}




//package com.blogs.dto;
//
//import lombok.Data;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Data
//public class BlogPostResDTO {
//    private Long id;
//    private String title;
//    private String content;
//    private String description;
//    private byte[] imageData;
//    private String image; // Image name or URL
//    private String categoryName;
//    private boolean status;
//    private String bloggerName;
//    private LocalDateTime createdOn;
//    private LocalDateTime updatedOn;
//    private List<String> tags;
//}