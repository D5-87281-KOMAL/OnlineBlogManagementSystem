//package com.blogs.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "subscriptions")
//@Getter
//@Setter
//@NoArgsConstructor
//@ToString
//public class Subscription extends BaseEntity {
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @Column(name = "plan_type", length = 20, nullable = false)
//    @Enumerated(EnumType.STRING)
//    private PlanType planType;
//
//    @Column(name = "start_date", nullable = false)
//    private LocalDateTime startDate;
//
//    @Column(name = "end_date", nullable = false)
//    private LocalDateTime endDate;
//
//    @Column(name = "status", length = 20)
//    @Enumerated(EnumType.STRING)
//    private SubscriptionStatus status;
//}



package com.blogs.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Subscription extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "plan_type", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private PlanType planType;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "status", length = 20)
    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;

	public void setStatus(String string) {
		// TODO Auto-generated method stub
		
	}
}
