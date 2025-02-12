package com.blogs.service.interf;
import com.blogs.dto.BlogPostReqDTO;
import com.blogs.dto.BlogPostResDTO;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;



public interface BlogPostService {
    void softDeleteBlogPost(Long id);
    BlogPostResDTO  getBlogPostById(Long id);
    List<BlogPostResDTO> getAllBlogPosts();
	BlogPostResDTO updateBlogPost(Long id, BlogPostReqDTO blogPostDTO, MultipartFile file);
	BlogPostResDTO createBlogPost(BlogPostReqDTO blogPostDTO, MultipartFile file);
	List<BlogPostResDTO> getBlogPostByIdAllBlogPost(Long id);
}



//package com.blogs.service.interf;
//
//import com.blogs.dto.BlogPostReqDTO;
//import com.blogs.dto.BlogPostResDTO;
//import java.util.List;
//
//public interface BlogPostService {
//    BlogPostResDTO createBlogPost(BlogPostReqDTO blogPostDTO, String username);
//    BlogPostResDTO updateBlogPost(Long id, BlogPostReqDTO blogPostDTO, String username);
//    void deleteBlogPost(Long id);
//    BlogPostResDTO getBlogPostById(Long id);
//    List<BlogPostResDTO> getAllPostsByCategory(String category, int page, int size, boolean mostRecentFirst);
//    List<BlogPostResDTO> getAllPosts(int page, int size, boolean mostRecentFirst);
//}