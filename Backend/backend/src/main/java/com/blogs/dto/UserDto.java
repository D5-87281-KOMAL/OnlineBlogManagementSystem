package com.blogs.dto;




import com.blogs.entity.SubscriptionStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String password;
    private String profilePicture;
    private String role; // This can be null when not provided in the request
    private SubscriptionStatus subscriptionStatus;
    

    
}
