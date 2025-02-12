//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "payments")
//public class Payment {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private BigDecimal amount;
//    private String method;
//    private String status;
//    
//    @Column(name = "created_at")
//    private final LocalDateTime createdAt = LocalDateTime.now();
//}




package com.blogs.entity;

import jakarta.persistence.*;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "payments")
public class Payment extends BaseEntity {

    @Column(name = "amount")
    @JsonIgnore
    private BigDecimal amount;

    @Column(name = "method", length = 50)
    private String method;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

	public void setUser(User user) {
		// TODO Auto-generated method stub
		
	}
}