import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blogposts/get');
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handlePostClick = (postId) => {
    console.log('Post clicked:', postId); // Debugging: Log the postId
    navigate(`/post/${postId}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter posts based on the selected category
  const filteredPosts = selectedCategory === 'All'
    ? post
    : post.filter((post) => post.categoryName === selectedCategory);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Category Selector */}
      <FormControl fullWidth sx={{ mb: 4, mt: 5 }}>
        <InputLabel sx={{ color: 'orange', fontSize: 20 }}>Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Movie">Movie</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Tech">Tech</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Automobile">Automobile</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          <MenuItem value="Gaming">Gaming</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={4}>
        {filteredPosts.map((post) => ( // Use filteredPosts instead of post
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                cursor: 'pointer',
              }}
              onClick={() => handlePostClick(post.id)} // Correctly using handlePostClick
            >
              {post.imageData && (
                <CardMedia
                  component="img"
                  height="250"
                  image={`data:image/jpeg;base64,${post.imageData}`}
                  alt={post.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Category: {post.categoryName}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Author: {post.bloggerName}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Content: {post.content}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Description: {post.description}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  Tags: {post.tags.join(', ')}
                </Typography>
              </CardContent>
              <Box sx={{ marginBottom: 2, marginLeft: 2 }}></Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;