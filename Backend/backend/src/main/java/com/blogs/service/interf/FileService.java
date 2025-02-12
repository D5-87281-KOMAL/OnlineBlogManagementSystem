package com.blogs.service.interf;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	boolean isImageWithValidExtension(MultipartFile file);
}
