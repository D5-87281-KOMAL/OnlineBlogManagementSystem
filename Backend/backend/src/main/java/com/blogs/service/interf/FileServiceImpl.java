//package com.blogs.service.interf;



//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//@Service
//public class FileServiceImpl implements FileService {
//
//	@Override
//	public boolean isImageWithValidExtension(MultipartFile file) {
//		String filename = file.getOriginalFilename();
//		if (filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
//			return true;
//		}
//		return false;
//	}
//}
//




package com.blogs.service.interf;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public boolean isImageWithValidExtension(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }
        String filename = file.getOriginalFilename();
        if (filename == null) {
            return false;
        }
        return filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg");
    }
}