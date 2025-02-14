import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function Profile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        phone_number: '',
        profile_picture: '',
        role: 'BLOGGER',
        subscription_status: 'inactive',
    });

    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1]; // Get the payload part of the token
            const decodedPayload = atob(payload); // Decode the base64 payload
            return JSON.parse(decodedPayload); // Parse the JSON payload
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const loadUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const id = localStorage.getItem('id'); // Retrieve the user's ID
    
        // if (!token || !id) {
        //   navigate('/login');
        //   return;
        // }
    
        const response = await axios.get(`http://localhost:8000/user/${id}`, {
          headers: {
            Authorization: token,
            
          },
        });
    
        console.log('User Data:', response.data); // Log the user data
        setFormData(response.data); // Set user data in state
      } catch (error) {
        console.error('Error loading user profile:', error);
        if (error.response && error.response.status === 403) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        } else {
          alert('Failed to load profile. Please try again.');
        }
      }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const id = localStorage.getItem('id');

            // if (!token || !id) {
            //     navigate('/login');
            //     return;
            // }

            const response = await axios.put(`http://localhost:8000/user/${id}`, formData, {
                headers: {
                    Authorization: token, // Ensure the token is prefixed with 'Bearer'
                },
            });

            console.log('Update response:', response.data); // Log the response
            alert('Profile updated successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response) {
                console.error('Response data:', error.response.data); // Log the error response
                console.error('Status code:', error.response.status); // Log the status code
            }
            if (error.response && error.response.status === 403) {
                alert('Session expired. Please log in again.');
                navigate('/login');
            } else {
                alert('Failed to update profile. Please try again.');
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }}
                        src={formData.profilePicture}
                        alt="Profile"
                    />
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoFocus
                                    variant='standard'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    variant='standard'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant='standard'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone_number"
                                    label="Phone Number"
                                    type="tel"
                                    id="Phone_number"
                                    autoComplete="tel"
                                    variant='standard'
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="profilePicture"
                                    label="Profile Picture URL"
                                    type="url"
                                    id="profilePicture"
                                    autoComplete="url"
                                    variant='standard'
                                    value={formData.profilePicture}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="role"
                                    label="Role"
                                    id="role"
                                    variant='standard'
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="subscription_status"
                                    label="Subscription Status"
                                    id="subscription_status"
                                    variant='standard'
                                    value={formData.subscription_status}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}




