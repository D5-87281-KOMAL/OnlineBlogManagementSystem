package com.blogs.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true, exclude = {"password", "profilePicture"})
public class User extends BaseEntity {

  

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "email", length = 150, unique = true)
    private String email;
    
    @Column(name = "PhoneNumber", length = 15, unique = true)
    private String phoneNumber;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 20)
    private UserRole role;

    @Column(name = "profile_picture", length = 255)
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_status", length = 20)
    private SubscriptionStatus subscriptionStatus;

}
