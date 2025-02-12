package com.blogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.dto.LoginRequest;
import com.blogs.dto.Response;
import com.blogs.dto.UserDto;
import com.blogs.service.interf.UserService;

import lombok.RequiredArgsConstructor;


@RestController
//@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	 	@Autowired
	    private  UserService userService;

	    @PostMapping("/register")
	    public ResponseEntity<Response> registerUser(@RequestBody UserDto registrationRequest){
	        System.out.println(registrationRequest);
	        return ResponseEntity.ok(userService.registerUser(registrationRequest));
	    }
	    @PostMapping("/login")
	    public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest){
	        return ResponseEntity.ok(userService.loginUser(loginRequest));
	    }
}
