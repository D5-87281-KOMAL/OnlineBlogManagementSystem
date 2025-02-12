//package com.blogs.repository;
//
//
//import com.blogs.entity.Tag;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface TagRepo extends JpaRepository<Tag, Long> {
//}

package com.blogs.repository;

import com.blogs.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepo extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}