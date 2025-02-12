//package com.blogs.entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Table(name = "comments")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true,of= {"comment"})
//public class Comment extends BaseEntity {
//	@Column(name = "comment")
//	private String comment;
////	private int rating;
//	//many ---> one (Comment *-->1 User:commenter)
//	@ManyToOne
//	@JoinColumn(nullable = false,name="commenter_id")
//	private User commenter;
//	//many ---> one (Comment *-->1 BlogPost)
//	@ManyToOne
//	@JoinColumn(nullable = false,name="blog_post_id")
//	private BlogPost blogpost;
//	public Comment(String comment, int rating) {
//		super();
//		this.comment = comment;
////		this.rating = rating;
//	}
//	
//
//}




//
//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "comments")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true, of = {"comment"})
//public class Comment extends BaseEntity {
//
//    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
//    private String comment;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "commenter_id", nullable = false)
//    private User commenter;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "blog_post_id", nullable = false)
//    private BlogPost blogpost;
//
//    public Comment(String comment) {
//        this.comment = comment;
//    }
//}





//
//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "comments")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true, of = {"comment"})
//public class Comment extends BaseEntity {
//
//    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
//    private String comment;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "commenter_id", nullable = false)
//    private User commenter;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "blog_post_id",nullable = false)
//    private BlogPost blogpost;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "reply_to_id")
//    private Comment replyTo;
//
//    public Comment(String comment) {
//        this.comment = comment;
//    }
//}




//
//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
////import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "comments")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true, of = {"comment"})
//public class Comment extends BaseEntity {
//
//    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
//    private String comment;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "commenter_id", nullable = false)
//    private User commenter;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "blog_post_id", nullable = false)
//    private BlogPost blogpost;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "reply_to_id")
//    private Comment replyTo;
//
////    @Column(name = "created_on", nullable = false)
////    private LocalDateTime createdOn;
////
////    @Column(name = "updated_on", nullable = false)
////    private LocalDateTime updatedOn;
//
//    public Comment(String comment,Comment replyTo,BlogPost blogpost) {
//        this.comment = comment;
//        this.replyTo = replyTo;
//        this.blogpost =blogpost;
//    }
//}




package com.blogs.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, of = {"comment"})
public class Comment extends BaseEntity {

    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "commenter_id", nullable = false)
    private User commenter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "blog_post_id", nullable = false)
    private BlogPost blogpost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "reply_to_id")
    private Comment replyTo;

    public Comment(String comment, Comment replyTo, BlogPost blogpost) {
        this.comment = comment;
        this.replyTo = replyTo;
        this.blogpost = blogpost;
    }
    
    @OneToMany(mappedBy = "replyTo", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> replies;  // List of replies
    
    
}
