package com.blogs.service.interf;

public interface OTPService {
	boolean verifyOTP(String email, String otp);
	void saveOTP(String email, String otp);
	String generateOTP();

}
