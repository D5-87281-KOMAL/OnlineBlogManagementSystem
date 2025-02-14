import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from './api';

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        // Add other fields as needed
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.updateProfile(formData.email, formData);
            if (response.isSuccess) {
                alert('Profile updated successfully!');
                navigate('/home'); // Redirect to home after successful update
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            {/* Add other input fields as needed */}
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileUpdate;