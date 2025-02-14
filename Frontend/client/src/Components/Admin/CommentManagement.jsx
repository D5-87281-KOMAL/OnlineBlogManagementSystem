import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Paper, Container, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [activeReplies, setActiveReplies] = useState({}); // Track which comment has replies visible

  // Fetch all comments from the backend API
  const fetchComments = () => {
    axios.get('http://localhost:8000/api/comments')
      .then((response) => {
        setComments(response.data);  // Store the list of all comments in state
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  

  // Handle deleting a comment
  // Handle deleting a comment
const handleDeleteComment = (commentId) => {
  if (commentId) {
    axios.delete(`http://localhost:8000/api/comments/${commentId}`)
      .then(() => {
        fetchComments();  // Refresh comments list after deleting a comment
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  } else {
    console.error("Comment ID is missing!");
  }
};


  // Toggle visibility of replies for a specific comment
  const toggleRepliesVisibility = (commentId) => {
    setActiveReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId] // Toggle visibility of replies for the comment
    }));
  };

  useEffect(() => {
    fetchComments();  // Fetch all comments when the component mounts
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        All Comments
      </Typography>

      {/* Comment List */}
      <List sx={{ marginTop: '20px' }}>
        {comments.map((comment) => (
          <Paper key={comment.id} sx={{ padding: '10px', marginBottom: '10px' }}>
            <ListItem>
              <ListItemText
                primary={<strong>{comment.commenterName}</strong>}
                secondary={comment.comment}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton color="primary" onClick={() => toggleRepliesVisibility(comment.id)}>
                  <ReplyIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>

            {/* Display replies if they exist and visibility is toggled */}
            {activeReplies[comment.id] && comment.replies && comment.replies.length > 0 && (
              <Box sx={{ paddingLeft: '20px', marginTop: '10px' }}>
                {comment.replies.map((reply) => (
                  <Paper key={reply.id} sx={{ padding: '10px', marginBottom: '10px' }}>
                    <ListItem>
                      <ListItemText
                        primary={<strong>{reply.commenterName}</strong>}
                        secondary={reply.comment}
                      />
                    </ListItem>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        ))}
      </List>
    </Container>
  );
}

export default CommentSection;
