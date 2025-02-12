package com.blogs.controller;

import com.blogs.dto.Response;
import com.blogs.entity.User;
import com.blogs.service.interf.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/get-all")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/bloggers")
    public ResponseEntity<List<User>> getAllBloggers() {
        List<User> bloggers = userService.getAllBloggers();
        return ResponseEntity.ok(bloggers);
    }
 


        // Fetch user profile by id
        @GetMapping("/{id}")
        public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
            User user = userService.getUserProfile(id);
            return ResponseEntity.ok(user);
        }

        // Update user profile by id
        @PutMapping("/{id}")
        public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
            User user = userService.updateUserProfile(id, updatedUser);
            return ResponseEntity.ok(user);
        }
        
        
        
        @DeleteMapping("/{id}")
        public ResponseEntity<Response> deleteUser(@PathVariable Long id) {
            Response response = userService.deleteUser(id);
            return ResponseEntity.ok(response);
        }
    }

     

