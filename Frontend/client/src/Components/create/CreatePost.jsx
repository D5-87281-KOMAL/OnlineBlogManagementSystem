import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormGroup, Label } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';
import JoditEditor from 'jodit-react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const CreatePost = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('categoryId');

  const [post, setPost] = useState({
    title: '',
    content: "",
    description: '',
    categoryId: categoryId || '',
    bloggerId: localStorage.getItem('id'),
    bloggerIdId: localStorage.getItem('id'),
    status: true,
    tagIds: [],
    imageData: null,
  });

  const [categories, setCategories] = useState([]); // Available categories from backend
  const [imagePreview, setImagePreview] = useState(null); // Store preview image URL
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const textAreaEditor = useRef(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category/get-all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setPost({ ...post, content });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, imageData: file });
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleTagChange = (e) => {
    setPost({ ...post, tagIds: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const strippedContent = stripHtmlTags(post.content); // Strip HTML tags from content

      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', strippedContent); // Use stripped content
      formData.append('description', post.description);
      formData.append('categoryId', post.categoryId);
      formData.append('bloggerId', post.bloggerId);
      formData.append('bloggerIdId', post.bloggerIdId);
      formData.append('status', post.status ? 1 : 0);
      formData.append('tagIds', post.tagIds); // Convert array to a string
      if (post.imageData) {
        formData.append('imageData', post.imageData); // Append image file
      }

      const response = await axios.post('http://localhost:8000/api/blogposts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        alert('Post created successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />
      <label>Content</label>
      {/* JoditEditor for Content */}
      <JoditEditor
        ref={textAreaEditor}
        value={post.content}
        onChange={handleContentChange}
        // config={{
        //   removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
        //   disablePlugins: 'paste,font,fontsize,image,media,table,video,file,link',
        // }}
        style={{ marginBottom: 2 }}
      />
      <br />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        name="description"
        value={post.description}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />

      {/* Category Selection */}
      {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          name="categoryId"
          value={post.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {/* Tag Selection */}
      <TextField
        fullWidth
        label="Tags (Comma Separated)"
        name="tagIds"
        value={post.tagIds}
        onChange={handleTagChange}
        sx={{ marginBottom: 2 }}
      />

      {/* Image Upload */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ marginBottom: 2 }}
      >
        Upload Image
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>

      {/* Image Preview */}
      {imagePreview && (
        <Box sx={{ marginBottom: 2 }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
          />
        </Box>
      )}

      <Button variant="contained" onClick={handleSubmit}>
        Create Post
      </Button>
    </Box>
  );
};

export default CreatePost;