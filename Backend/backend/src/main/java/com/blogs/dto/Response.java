package com.blogs.dto;
 

import com.fasterxml.jackson.annotation.JsonInclude;

import com.blogs.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private int status;
    private String message;
    private final LocalDateTime timestamp = LocalDateTime.now();

    private String token;
    private String role;
    private String  expirationTime;

    private int totalPage;
    private long totalElement;

    
    private User user;
    
    private List<UserDto> userList;

    private CategoryDto category;
    private List<CategoryDto> categoryList;

   
}