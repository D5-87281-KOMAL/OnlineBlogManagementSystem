//package com.blogs.entity;
//
//import java.util.HashSet;
//import java.util.Set;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinTable;
//import jakarta.persistence.ManyToMany;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Table(name = "tags")
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString(callSuper = true, of = "name")
//public class Tag extends BaseEntity {
//	@Column(length = 20, unique = true)
//	private String name;
//	//Tag *--->* BlogPost - many to many , uni dir association between the entities
//	@ManyToMany //mandatory o.w MappingException !
//	@JoinTable(name="my_tag_posts",joinColumns = @JoinColumn(name="tag_id")
//	,inverseJoinColumns = @JoinColumn(name="post_id")
//	) //optional to specify name of the mapping table
//	private Set<BlogPost> blogPosts=new HashSet<>();
//	public Tag(String name) {
//		super();
//		this.name = name;
//	}
//
//}



package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tags")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, of = "name")
public class Tag extends BaseEntity {

    @Column(name = "name", length = 20, unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<BlogPost> blogPosts = new HashSet<>();

    public Tag(String name) {
        this.name = name;
    }
}
