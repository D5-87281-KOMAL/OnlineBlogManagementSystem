package com.blogs.service.interf;

import com.blogs.dto.LoginRequest;
import com.blogs.dto.Response;
import com.blogs.dto.UserDto;
import com.blogs.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
   
}
