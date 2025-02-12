package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = {"blogCategory", "blogger", "comments"})
@EqualsAndHashCode(of = "title", callSuper = false)
public class BlogPost extends BaseEntity {

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Lob
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)    
//    @JsonIgnore
    private Category blogCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blogger_id", nullable = false)
//    @JsonIgnore
    private User blogger;
//    @JsonIgnore
    private Long bloggerIdId;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "blogpost", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JsonIgnore
    @JoinTable(
        name = "post_tags",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
    
    public BlogPost(String title, String description, String content) {
        super();
        this.title = title;
        this.description = description;
        this.content = content;
    }


}





