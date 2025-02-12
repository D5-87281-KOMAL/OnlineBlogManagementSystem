//package com.blogs.dto;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import com.blogs.entity.User;
//import com.blogs.repository.UserRepo;
//
//public class UserProfileDTO{
//	
//	 @Autowired
//	 private UserRepo userRepository;
////In UserService
//public UserProfileDTO getUserProfile(String email) {
// User user = UserRepo.findByEmail(email)
//         .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
// return mapToDTO(user);
//}
//
//private UserProfileDTO mapToDTO(User user) {
// UserProfileDTO dto = new UserProfileDTO();
// dto.setName(user.getName());
// dto.setEmail(user.getEmail());
// dto.setPhoneNumber(user.getPhoneNumber());
// dto.setProfilePicture(user.getProfilePicture());
// dto.setRole(user.getRole());
// dto.setSubscriptionStatus(user.getSubscriptionStatus());
// return dto;
//}
//
////In UserController
//@GetMapping("/{email}")
//public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable String email) {
// UserProfileDTO userProfile = userService.getUserProfile(email);
// return ResponseEntity.ok(userProfile);
//}
//
//}