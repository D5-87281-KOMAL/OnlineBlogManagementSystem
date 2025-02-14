// import React, { useState, useEffect } from 'react';
// import { styled, Box, Typography, Button, TextField,CardMedia } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Container = styled(Box)`
//   border: 1px solid #d3cede;
//   border-radius: 10px;
//   margin: 10px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   height: 350px;
//   & > img,
//   & > p {
//     padding: 0 5px 5px 5px;
//   }
// `;

// const Text = styled(Typography)`
//   color: #878787;
//   font-size: 12px;
// `;

// const Heading = styled(Typography)`
//   font-size: 18px;
//   font-weight: 600;
// `;

// const Details = styled(Typography)`
//   font-size: 14px;
//   word-break: break-word;
// `;

// const Post = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedPost, setUpdatedPost] = useState({});

//   useEffect(() => {
//     const fetchPost = async () => {
//       const response = await axios.get(`http://localhost:8000/api/blogposts/${postId}`);
//       setPost(response.data);
//       setUpdatedPost(response.data);
//     };
//     fetchPost();
//   }, [postId]);

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:8000/api/blogposts/${postId}`, updatedPost);
//     setIsEditing(false);
//     setPost(updatedPost);
//   };

//   const handleSoftDelete = async () => {
//     await axios.delete(`http://localhost:8000/api/blogposts/${postId}`);
//     navigate('/home');
//   };

//   const addEllipsis = (str, limit) => {
//     return str.length > limit ? str.substring(0, limit) + '...' : str;
//   };

//   if (!post) return <Typography>Loading...</Typography>;

//   return (
//     <Container>
//       {isEditing ? (
//         <>
//           <TextField
//             fullWidth
//             label="Title"
//             value={updatedPost.title}
//             onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Content"
//             value={updatedPost.content}
//             onChange={(e) => setUpdatedPost({ ...updatedPost, content: e.target.value })}
//             sx={{ marginBottom: 2 }}
//           />
//           <Button onClick={handleUpdate} variant="contained" color="primary">
//             Save
//           </Button>
//         </>
//       ) : (
//         <> 
//         {post.imageData && (
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={`data:image/jpeg;base64,${post.imageData}`}
//                     alt={post.title}
//                   />)}
//           <Text>{post.categoryName}</Text>
//           <Heading>{addEllipsis(post.title, 20)}</Heading>
//           <Text>Author: {post.bloggerName}</Text>
//           <Details>{addEllipsis(post.content, 100)}</Details>
//           <Button onClick={() => setIsEditing(true)} variant="contained" color="secondary">
//             Edit
//           </Button>
//           <Button onClick={handleSoftDelete} variant="contained" color="error">
//             Delete
//           </Button>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Post;