package com.blogs.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "posts")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"blogCategory", "blogger"})
@EqualsAndHashCode(of = "title", callSuper = false)
public class BlogPost extends BaseEntity {

    @Column(unique = true, length = 100)
    private String title;

    private String description;

    @Column(length = 1000)
    private String content;

    // Add status flag for soft delete operation
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private BlogPostStatus status;

    // BlogPost * -----> 1 Category
    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading to avoid unnecessary loading
    @JoinColumn(name = "category_id", nullable = false) // To customize name of FK column
    private Category blogCategory;

    // BlogPost * ---> 1 User (Blogger)
    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading for blogger association
    @JoinColumn(nullable = false)
    private User blogger;

    // Constructor with required fields
    public BlogPost(String title, String description, String content) {
        this.title = title;
        this.description = description;
        this.content = content;
    }
    
    
    public void setStatus(BlogPostStatus status) {
        this.status = status;
    }

    public BlogPostStatus getStatus() {
        return status;
    }
}
