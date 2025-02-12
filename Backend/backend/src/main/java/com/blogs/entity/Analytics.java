//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "analytics")
//@Getter
//@Setter
//@NoArgsConstructor
//@ToString
//public class Analytics extends BaseEntity {
//
//    @Column(name = "views")
//    private int views;
//
//    @Column(name = "likes")
//    private int likes;
//
//    @Column(name = "shares")
//    private int shares;
//
//    @Column(name = "comments")
//    private int comments;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "post_id", nullable = false)
//    private BlogPost post;
//}



package com.blogs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "analytics")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Analytics extends BaseEntity {

    @Column(name = "views")
    private int views;

    @Column(name = "likes")
    private int likes;

    @Column(name = "shares")
    private int shares;

    @Column(name = "comments")
    private int comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "post_id", nullable = false)
    private BlogPost post;
}