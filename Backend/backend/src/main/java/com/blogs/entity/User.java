
package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(name = "phone_number", length = 15, unique = true)
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

    @OneToMany(mappedBy = "blogger", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BlogPost> blogPosts;

    @OneToMany(mappedBy = "commenter", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;
}