import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography, Container, Box, CircularProgress, Alert } from '@mui/material';

function PostManagement() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog posts from the API
  const fetchBlogPosts = () => {
    setLoading(true);
    axios.get('http://localhost:8000/api/blogposts/get')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else {
          console.error('Expected an array of blog posts, but got:', data);
          setBlogPosts([]);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the blog posts!', error);
        setError('Failed to fetch blog posts. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Handle delete post
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/blogposts/${id}`)
      .then(response => {
        alert("Post deleted successfully", response.data.message); // Show success message
        fetchBlogPosts(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the post!', error);
        alert('Failed to delete post');
      });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px', paddingBottom: '40px' }}>
      <Box sx={{ marginBottom: '40px', textAlign: 'center' }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Post Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage and review all blog posts in one place.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      ) : blogPosts.length === 0 ? (
        <Alert severity="info" sx={{ marginBottom: '20px' }}>
          No blog posts found.
        </Alert>
      ) : (
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
          }}
        >
          <Table sx={{ minWidth: 800 }} aria-label="posts table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Blogger Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Category Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Title</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Content</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Description</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogPosts.map((post, index) => (
                <TableRow
                  key={post.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                    '&:hover': { backgroundColor: '#f2f2f2', cursor: 'pointer' },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {post.id}
                  </TableCell>
                  <TableCell align="center">{post.bloggerName}</TableCell>
                  <TableCell align="center">{post.categoryName}</TableCell>
                  <TableCell align="center">{post.title}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        padding: '8px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9',
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#1976d2',
                          borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: '#f1f1f1',
                        },
                      }}
                    >
                      {post.content}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        padding: '8px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9',
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#1976d2',
                          borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: '#f1f1f1',
                        },
                      }}
                    >
                      {post.description}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        padding: '6px 12px',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#d32f2f' },
                      }}
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default PostManagement;