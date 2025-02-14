



// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Card, CardContent, CardMedia, Grid, CircularProgress,Box,Button } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const YourPosts = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem('id');



//   useEffect(() => {
//     if (!userId) {
//       navigate('/login'); // Redirect to login if userId is not available
//       return;
//     }

//     // Fetch posts by userId
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/blogposts/${userId}`);
//         setPost(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userId, navigate]);

//   if (loading) {
//     return (
//       <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   const handleEditPost = () => {
//     navigate(`/edit-post/${postId}}`);
//   };



//   const handleDeletePost = async () => {
   
//     try {
//       await axios.delete(`http://localhost:8000/api/blogposts/${postId}`);
//       navigate('/home');
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
  
// };
  
//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'orange', textAlign: 'center' }}>
//         Your Posts
//       </Typography>
//       <Grid container spacing={4}>
//             <Grid item key={post.id} xs={12} sm={6} md={4}>
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
//                   {post.imageData && (
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={`data:image/jpeg;base64,${post.imageData}`}
//                       alt={post.title}
//                     />)}
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h5">{post.title}</Typography>
//                       {/* <Typography variant="body1" sx={{ marginTop: 2 }}>{post.content}</Typography> */}
//                       <Typography variant="body2" sx={{ marginTop: 2 }}>Category: {post.categoryName}</Typography>
//                       <Typography variant="body2" sx={{ marginTop: 2 }}>Author: {post.bloggerName}</Typography>
//                       <Typography variant="body2" sx={{ marginTop: 2 }}>Content: {post.content}</Typography>
//                       <Typography variant="body2" sx={{ marginTop: 2 }}>Description: {post.description}</Typography>
//                       <Typography variant="body2" sx={{ marginTop: 2 }}>Tags: {post.tags}</Typography>
//                 </CardContent>

//                 <Box sx={{ marginBottom: 2,marginLeft:2 }}>
//                   <Button variant="contained" color="primary" onClick={handleEditPost} sx={{ marginRight: 2 }}>
//                     Edit Post
//                   </Button>
//                   <Button variant="contained" color="error" onClick={handleDeletePost}>
//                     Delete Post
//                   </Button>
//                 </Box>
//               </Card>
//             </Grid>
//       </Grid>

      
//     </Container>
  
  


  
//   );
// };

// export default YourPosts;




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
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const YourPosts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect to login if userId is not available
      return;
    }

    // Fetch posts by userId
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogposts/${userId}`);
        console.log('API Response:', response.data); // Log the response for debugging
        if (Array.isArray(response.data)) {
          setPost(response.data); // Set the array of posts
        } else {
          console.error('API response is not an array:', response.data);
          setPost([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [userId, navigate]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/api/blogposts/${postId}`);
      // Remove the deleted post from the state
      setPost(post.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'orange', textAlign: 'center' }}>
        Your Posts
      </Typography>
      <Grid container spacing={4}>
        {post.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
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
              <Box sx={{ marginBottom: 2, marginLeft: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditPost(post.id)}
                  sx={{ marginRight: 2 }}
                >
                  Edit Post
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeletePost(post.id)}>
                  Delete Post
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default YourPosts;