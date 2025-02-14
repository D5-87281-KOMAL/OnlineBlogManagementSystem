 
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const HopeUI = () => {
  const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Fetch post and user counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch post count
        const postResponse = await axios.get('http://localhost:8000/api/blogposts/get');
        setPostCount(postResponse.data.length);

        // Fetch user count
        const userResponse = await axios.get('http://localhost:8000/user/get-all');
        setUserCount(userResponse.data.userList.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  // Data for the posts pie chart
  const postsChartData = {
    labels: ['Posts'],
    datasets: [
      {
        label: 'Number of Posts',
        data: [postCount],
        backgroundColor: ['rgba(54, 162, 235, 0.6)'], // Blue color
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Data for the users pie chart
  const usersChartData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'Number of Users',
        data: [userCount],
        backgroundColor: ['rgba(255, 159, 64, 0.6)'], // Orange color
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Admin
        </Typography>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      {/* Help Devs Section */}
      <Paper elevation={3} sx={{ p: 4, my: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" gutterBottom>
          Help Devs!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We are on a mission to help developers like you build successful projects.
        </Typography>
        <Button variant="contained" color="primary">
          Learn More
        </Button>
      </Paper>

      {/* Posts and Users Count Section */}
      <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Posts
            </Typography>
            <Typography variant="h4" sx={{ color: 'blue' }}>
              {postCount}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Pie data={postsChartData} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4" sx={{ color: 'orange' }}>
              {userCount}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Pie data={usersChartData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HopeUI;