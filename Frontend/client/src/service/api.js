import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const API = {
    userLogin: async (loginData) => {
        try {
            const response = await axiosInstance.post('/login', loginData);
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Login failed' };
        }
    },

    userSignup: async (signupData) => {
        try {
            const response = await axiosInstance.post('/register', signupData);
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Signup failed' };
        }
    },


    updateProfile: async (email, formData) => {
        try {
            const response = await axiosInstance.put(`/profile',${email}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Profile update failed' };
        }
    },



    getComments: async (postId) => {
        try {
            const response = await axiosInstance.get(`/comments/${postId}`);
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Failed to fetch comments' };
        }
    },

    // Add a new comment
    addComment: async (commentData) => {
        try {
            const response = await axiosInstance.post('/comments', commentData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Failed to add comment' };
        }
    },

    // Reply to a comment
    replyComment: async (replyData) => {
        try {
            const response = await axiosInstance.post('/comments', replyData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Failed to reply to comment' };
        }
    },

    // Delete a comment
    deleteComment: async (commentId) => {
        try {
            const response = await axiosInstance.delete(`/comments/${commentId}`);
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Failed to delete comment' };
        }
    },

    // Update a comment (optional - if needed)
    updateComment: async (commentId, commentData) => {
        try {
            const response = await axiosInstance.put(`/comments/${commentId}`, commentData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return { isSuccess: true, data: response.data };
        } catch (error) {
            return { isFailure: true, message: error.response?.data || 'Failed to update comment' };
        }
    }



    
};






