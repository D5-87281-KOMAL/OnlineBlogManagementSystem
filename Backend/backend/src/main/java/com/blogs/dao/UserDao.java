package com.blogs.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogs.entity.User;

public interface UserDao extends JpaRepository<User,Long> {
//add a finder method for user 's signin
	Optional<User> findByEmailAndPassword(String em,String pass);
}

