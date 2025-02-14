import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    description: '',
    categoryName: '',
    tags: [],
    imageData: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogposts/user/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setPost((prevPost) => ({
      ...prevPost,
      tags: tagsArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated post data to the server
      await axios.put(`http://localhost:8000/api/blogposts/${postId}`, post);
      // Navigate back to the post details page after successful update
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post.title) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>Edit Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          name="content"
          value={post.content}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Description"
          name="description"
          value={post.description}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        {/* <TextField
          fullWidth
          label="Category"
          name="categoryName"
          value={post.categoryName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        /> */}
        {/* <TextField
          fullWidth
          label="Tags (comma separated)"
          name="tags"
          value={post.tags.join(', ')}
          onChange={handleTagsChange}
          sx={{ marginBottom: 2 }}
        /> */}
        {/* <TextField
          fullWidth
          label="Image URL"
          name="imageData"
          value={post.imageData}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        /> */}
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate(`/post/${postId}`)} sx={{ marginLeft: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditPost;