package com.blogs.service.impl;

import com.blogs.dto.LoginRequest;
import com.blogs.dto.Response;
import com.blogs.dto.UserDto;
import com.blogs.entity.User;
import com.blogs.entity.UserRole;
import com.blogs.exception.InvalidCredentialsException;
import com.blogs.exception.NotFoundException;
import com.blogs.exception.ResourceNotFoundException;
import com.blogs.mapper.EntityDtoMapper;
import com.blogs.repository.UserRepo;
import com.blogs.security.JwtUtils;
import com.blogs.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response registerUser(UserDto registrationRequest) {
        // Default role to BLOGGER if not provided
        UserRole role = UserRole.BLOGGER;

        if (registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("admin")) {
            role = UserRole.ADMIN;
        }

        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .role(role) // Assigning the role
                .build();

        User savedUser = userRepo.save(user);
        System.out.println("User registered successfully: " + savedUser);

     
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(savedUser)
                .build();
    }



    @Override
    public Response loginUser(LoginRequest loginRequest) {
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NotFoundException("Email not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password does not match");
        }

        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .user(user)
                .message("User Successfully Logged In")
                .token(token)
                .role(user.getRole().name())
                .expirationTime("6 Month")
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();

        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String  email = authentication.getName();
        log.info("User Email is: " + email);
        return userRepo.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User Not found"));
    }
    
    
    
    @Autowired
    private UserRepo userRepository;

    
    @Override
    public User getUserProfile(Long id) {
        // Get the authenticated user's email
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Get the email (username)
        log.info("Fetching profile for user with email: " + id);

        // Fetch the user by email
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+id));
    }

    @Override
    public User updateUserProfile(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with Id: " ));

        // Update fields if they are not null in the updatedUser object
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getProfilePicture() != null) {
            existingUser.setProfilePicture(updatedUser.getProfilePicture());
        }
        if (updatedUser.getRole() != null) {
            existingUser.setRole(updatedUser.getRole());
        }
        if (updatedUser.getSubscriptionStatus() != null) {
            existingUser.setSubscriptionStatus(updatedUser.getSubscriptionStatus());
        }

        return userRepo.save(existingUser);
    }


    @Override
    public List<User> getAllBloggers() {
        return userRepo.findByRole(UserRole.BLOGGER);
    }
    
    
    
    
    @Override
    public Response deleteUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        userRepo.delete(user);

        return Response.builder()
                .status(200)
                .message("User deleted successfully")
                .build();
    }

}



	 

    