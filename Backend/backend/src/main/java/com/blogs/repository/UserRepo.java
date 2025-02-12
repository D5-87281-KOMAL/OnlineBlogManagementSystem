package com.blogs.repository;

import com.blogs.entity.Category;
import com.blogs.entity.User;
import com.blogs.entity.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional <User> findById(Long id);
	List<User> findByRole(UserRole blogger);
	Optional<Category> findByName(String name);
	Optional<Category> findUserByName(String name);
	
}
