// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   CardMedia,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ShareIcon from '@mui/icons-material/Share';

// const PostDetails = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [replyTo, setReplyTo] = useState(null);
//   const [isAuthor, setIsAuthor] = useState(false);
//   const [openShareDialog, setOpenShareDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const userId = localStorage.getItem('id');

//   // Fetch post details
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/blogposts/user/${postId}`);
//         setPost(response.data);
//         if (response.data.bloggerId == userId) {
//           setIsAuthor(true);
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };
//     fetchPost();
//   }, [postId, userId]);

//   // Fetch comments
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/comments/${postId}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
//     fetchComments();
//   }, [postId]);

//   // Handle comment submission
//   const handleCommentSubmit = async () => {
//     try {
//       const commenterId = localStorage.getItem('id');
//       const commenterName = localStorage.getItem('name');

//       const response = await axios.post(`http://localhost:8000/api/comments`, {
//         comment: newComment,
//         blogPostId: postId,
//         replyToId: replyTo,
//         commenterId: commenterId,
//       });
//       setComments([...comments, response.data]);
//       setNewComment('');
//       setReplyTo('');
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//     }
//   };

//   // Handle post editing
//   const handleEditPost = () => {
//     navigate(`/edit-post/${postId}`);
//   };

//   // Handle post deletion
//   const handleDeletePost = async () => {
//     try {
//       await axios.delete(`http://localhost:8000/api/blogposts/${postId}`);
//       navigate('/home');
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   // Handle sharing
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: post.title,
//         text: post.content,
//         url: window.location.href,
//       })
//       .then(() => console.log('Successful share'))
//       .catch((error) => {
//         console.log('Error sharing', error);
//         setSnackbarMessage('Failed to share post.');
//         setSnackbarOpen(true);
//       });
//     } else {
//       setOpenShareDialog(true);
//     }
//   };

//   // Handle social media sharing
//   const handleSocialShare = (platform) => {
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(post.title);

//     let shareUrl = '';

//     switch (platform) {
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
//         break;
//       case 'facebook':
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case 'linkedin':
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//       default:
//         break;
//     }

//     if (shareUrl) {
//       window.open(shareUrl, '_blank');
//     }
//   };

//   // Handle copying link to clipboard
//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href)
//       .then(() => {
//         setSnackbarMessage('Link copied to clipboard!');
//         setSnackbarOpen(true);
//         setOpenShareDialog(false);
//       })
//       .catch(() => {
//         setSnackbarMessage('Failed to copy link.');
//         setSnackbarOpen(true);
//       });
//   };

//   // Handle snackbar close
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   if (!post) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ padding: 4 }}>
//       {/* Share Icon */}
//       <Box sx={{ 
//         position: 'fixed', 
//         top: 16, 
//         right: 16, 
//         backgroundColor: 'background.paper', 
//         borderRadius: '50%', 
//         boxShadow: 1,
//         zIndex: 1000,
//       }}>
//         <IconButton onClick={handleShare} color="primary">
//           <ShareIcon />
//         </IconButton>
//       </Box>

//       {/* Share Dialog */}
//       <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
//         <DialogTitle>Share Post</DialogTitle>
//         <DialogContent>
//           <Button 
//             fullWidth 
//             onClick={handleCopyLink}
//             sx={{ marginBottom: 2 }}
//           >
//             Copy Link
//           </Button>
//           <Button 
//             fullWidth 
//             onClick={() => {
//               handleSocialShare('twitter');
//               setOpenShareDialog(false);
//             }}
//             sx={{ marginBottom: 2 }}
//           >
//             Share on Twitter
//           </Button>
//           <Button 
//             fullWidth 
//             onClick={() => {
//               handleSocialShare('facebook');
//               setOpenShareDialog(false);
//             }}
//             sx={{ marginBottom: 2 }}
//           >
//             Share on Facebook
//           </Button>
//           <Button 
//             fullWidth 
//             onClick={() => {
//               handleSocialShare('linkedin');
//               setOpenShareDialog(false);
//             }}
//           >
//             Share on LinkedIn
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenShareDialog(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />

//       {/* Post Content */}
//       {post.imageData && (
//         <CardMedia
//           component="img"
//           height="250"
//           image={`data:image/jpeg;base64,${post.imageData}`}
//           alt={post.title}
//         />
//       )}
//       <Typography variant="h4">{post.title}</Typography>
//       <Typography variant="body1" sx={{ marginTop: 2 }}>{post.content}</Typography>
//       <Typography variant="body2" sx={{ marginTop: 2 }}>Category: {post.categoryName}</Typography>
//       <Typography variant="body2" sx={{ marginTop: 2 }}>Author: {post.bloggerName}</Typography>
//       <Typography variant="body2" sx={{ marginTop: 2 }}>Tags: {post.tags.join(', ')}</Typography>

//       {/* Edit and Delete Buttons (only visible to the author) */}
//       {isAuthor && (
//         <Box sx={{ marginTop: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleEditPost} sx={{ marginRight: 2 }}>
//             Edit Post
//           </Button>
//           <Button variant="contained" color="error" onClick={handleDeletePost}>
//             Delete Post
//           </Button>
//         </Box>
//       )}

//       {/* Comments Section */}
//       <Box sx={{ marginTop: 4 }}>
//         <Typography variant="h6">Comments</Typography>
//         <List>
//           {comments.map((comment) => (
//             <ListItem key={comment.id} sx={{ marginLeft: comment.replyToId ? 4 : 0 }}>
//               <Avatar>{comment.commenterName.charAt(0)}</Avatar>
//               <ListItemText
//                 primary={comment.commenterName}
//                 secondary={comment.comment}
//               />
//               <Button onClick={() => setReplyTo(comment.id)}>Reply</Button>
//             </ListItem>
//           ))}
//         </List>
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           label="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           sx={{ marginTop: 2 }}
//         />
//         <Button onClick={handleCommentSubmit} variant="contained" sx={{ marginTop: 2 }}>
//           Submit
//         </Button>
//       </Box>

//       {/* Back to Home Button */}
//       <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => navigate('/home')}>
//         Back to home
//       </Button>
//     </Box>
//   );
// };

// export default PostDetails;




import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [analytics, setAnalytics] = useState({ views: 0, likes: 0, shares: 0, comments: 0 });
  const [liked, setLiked] = useState(false);

  const userId = localStorage.getItem('id');

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blogposts/user/${postId}`);
        setPost(response.data);
        if (response.data.bloggerId == userId) {
          setIsAuthor(true);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId, userId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  // Fetch analytics
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/analytics/${postId}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, [postId]);

  // Increment views
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await axios.post(`http://localhost:8000/api/analytics/increment-views`, { postId });
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };
    incrementViews();
  }, [postId]);

  // Handle like toggle
  const handleLikeToggle = async () => {
    try {
      await axios.post(`http://localhost:8000/api/analytics/toggle-like`, { postId, userId });
      const response = await axios.get(`http://localhost:8000/api/analytics/${postId}`);
      setAnalytics(response.data);
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Handle edit post
  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`);
  };

  // Handle delete post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/blogposts/${postId}`);
      navigate('/home'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      setSnackbarMessage('Failed to delete post.');
      setSnackbarOpen(true);
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => {
        console.log('Error sharing', error);
        setSnackbarMessage('Failed to share post.');
        setSnackbarOpen(true);
      });
    } else {
      setOpenShareDialog(true);
    }
  };

  // Handle social media sharing
  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  // Handle copying link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setSnackbarMessage('Link copied to clipboard!');
        setSnackbarOpen(true);
        setOpenShareDialog(false);
      })
      .catch(() => {
        setSnackbarMessage('Failed to copy link.');
        setSnackbarOpen(true);
      });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/comments`, {
        postId,
        commenterId: userId,
        comment: newComment,
        replyToId: replyTo,
      });
      setComments([...comments, response.data]);
      setNewComment('');
      setReplyTo(null);
      setSnackbarMessage('Comment submitted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSnackbarMessage('Failed to submit comment.');
      setSnackbarOpen(true);
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Share Icon */}
      <Box sx={{ 
        position: 'fixed', 
        top: 16, 
        right: 16, 
        backgroundColor: 'background.paper', 
        borderRadius: '50%', 
        boxShadow: 1,
        zIndex: 1000,
      }}>
        <IconButton onClick={handleShare} color="primary">
          <ShareIcon />
        </IconButton>
      </Box>

      {/* Share Dialog */}
      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>Share Post</DialogTitle>
        <DialogContent>
          <Button 
            fullWidth 
            onClick={handleCopyLink}
            sx={{ marginBottom: 2 }}
          >
            Copy Link
          </Button>
          <Button 
            fullWidth 
            onClick={() => {
              handleSocialShare('twitter');
              setOpenShareDialog(false);
            }}
            sx={{ marginBottom: 2 }}
          >
            Share on Twitter
          </Button>
          <Button 
            fullWidth 
            onClick={() => {
              handleSocialShare('facebook');
              setOpenShareDialog(false);
            }}
            sx={{ marginBottom: 2 }}
          >
            Share on Facebook
          </Button>
          <Button 
            fullWidth 
            onClick={() => {
              handleSocialShare('linkedin');
              setOpenShareDialog(false);
            }}
          >
            Share on LinkedIn
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

      {/* Post Content */}
      {post.imageData && (
        <CardMedia
          component="img"
          height="250"
          image={`data:image/jpeg;base64,${post.imageData}`}
          alt={post.title}
        />
      )}
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>{post.content}</Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>Category: {post.categoryName}</Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>Author: {post.bloggerName}</Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>Tags: {post.tags.join(', ')}</Typography>

      {/* Analytics Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <IconButton onClick={handleLikeToggle} color={liked ? 'primary' : 'default'}>
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginRight: 2 }}>{analytics.likes}</Typography>
        <IconButton>
          <ThumbDownIcon />
        </IconButton>
        <Typography variant="body1" sx={{ marginRight: 2 }}>{analytics.shares}</Typography>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
        <Typography variant="body1">{analytics.views}</Typography>
      </Box>

      {/* Edit and Delete Buttons (only visible to the author) */}
      {isAuthor && (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleEditPost} sx={{ marginRight: 2 }}>
            Edit Post
          </Button>
          <Button variant="contained" color="error" onClick={handleDeletePost}>
            Delete Post
          </Button>
        </Box>
      )}

      {/* Comments Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Comments</Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} sx={{ marginLeft: comment.replyToId ? 4 : 0 }}>
              <Avatar>{comment.commenterName.charAt(0)}</Avatar>
              <ListItemText
                primary={comment.commenterName}
                secondary={comment.comment}
              />
              <Button onClick={() => setReplyTo(comment.id)}>Reply</Button>
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button onClick={handleCommentSubmit} variant="contained" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>

      {/* Back to Home Button */}
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => navigate('/home')}>
        Back to home
      </Button>
    </Box>
  );
};

export default PostDetails;