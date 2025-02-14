import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Update with your backend URL
});

// API Functions
const getCategories = async () => {
  const response = await axiosInstance.get("/category/get-all");
  return response.data; // Directly return the response data
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.categoryList) {
        setCategories(response.categoryList); // Set the categoryList directly
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorMessage("Failed to load categories. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = () => {
    if (categoryId) {
      navigate(`/create?categoryId=${categoryId}`);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel variant='filled'>Category</InputLabel>
        <Select
          name="categoryId"
          value={categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Button variant="contained" onClick={handleSubmit} disabled={!categoryId}>
        Next
      </Button>
    </Box>
  );
};

export default Category;