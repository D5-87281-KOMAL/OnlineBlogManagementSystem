package com.blogs.repository;

import com.blogs.entity.Category;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {

	Optional<Category> findByCategoryName(String category);
}
