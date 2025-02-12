//package com.blogs.entity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Table(name = "categories")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true,exclude = "blogPosts")
//public class Category extends BaseEntity {
//	@Column(name = "category_name", unique = true, length = 30)
//	private String categoryName;
//	private String description;
//	@OneToMany(mappedBy = "blogCategory", cascade = CascadeType.ALL,orphanRemoval = true)
//	@JsonIgnore
//	private List<BlogPost> blogPosts = new ArrayList<>();
//	public Category(String categoryName, String description) {
//		super();
//		this.categoryName = categoryName;
//		this.description = description;
//	}
//
//	// helper methods to add n remove child entity
//	public void addBlogPost(BlogPost post) {
//		this.blogPosts.add(post);
//		post.setBlogCategory(this);
//	}
//
//	public void removeBlogPost(BlogPost post) {
//		this.blogPosts.remove(post);
//		post.setBlogCategory(null);
//	}
//
//
//}





package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "blogPosts")
public class Category extends BaseEntity {

    @Column(name = "category_name", unique = true, length = 30)
    private String categoryName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "blogCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BlogPost> blogPosts = new ArrayList<>();

    public Category(String categoryName, String description) {
        this.categoryName = categoryName;
        this.description = description;
    }

    public void createBlogPost(BlogPost post) {
        this.blogPosts.add(post);
        post.setBlogCategory(this);
    }

    public void softDeleteBlogPost(BlogPost post) {
        this.blogPosts.remove(post);
        post.setBlogCategory(null);
    }

}
