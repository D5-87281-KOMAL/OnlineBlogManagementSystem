import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css"; // Import the CSS for the page

// Base URL for the API
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Update with your backend URL
});

// API Functions
const getCategories = async () => {
  const response = await axiosInstance.get("/category/get-all");
  return response.data; // Directly return the response data
};

const addCategory = async (categoryData) => {
  const response = await axiosInstance.post("/category/create", categoryData);
  return response.data;
};

const updateCategory = async (categoryId, categoryData) => {
  const response = await axiosInstance.put(`/category/update/${categoryId}`, categoryData);
  return response.data;
};

const deleteCategory = async (categoryId) => {
  const response = await axiosInstance.delete(`/category/delete/${categoryId}`);
  return response.data;
};

// Category Component
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  // Handle Add or Update Category
  const handleSubmit = async () => {
    if (!categoryName || !description) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      let response;
      if (editCategory) {
        response = await updateCategory(editCategory.categoryId, { categoryName, description });
      } else {
        response = await addCategory({ categoryName, description });
      }

      if (response.status === 200) {
        setSuccessMessage(editCategory ? "Category updated successfully!" : "Category added successfully!");
        resetForm();
        fetchCategories(); // Refresh the category list
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(editCategory ? "Error updating category." : "Error adding category.");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setCategoryName("");
    setDescription("");
    setEditCategory(null);
  };

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 200) {
        setSuccessMessage("Category deleted successfully!");
        fetchCategories(); // Refresh the category list
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Error deleting category.");
    }
  };


  return (
    <div className="admin-dashboard">
      <h1>Category Management</h1>

      {/* Display success or error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Form to Add / Update Category */}
      <div className="form-container">
        <h2>{editCategory ? "Edit Category" : "Add Category"}</h2>
        <div className="form-fields">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
          <button onClick={handleSubmit} className={`form-button ${editCategory ? "update-button" : "add-button"}`}>
            {editCategory ? "Update" : "Add"}
          </button>
          {editCategory && (
            <button onClick={resetForm} className="form-button cancel-button">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Category List */}
      <div className="category-list">
        <h3>Categories</h3>
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Use index as ID since there is no unique ID in the response */}
                <td>{category.categoryName}</td>
                <td>{category.description}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditCategory(category);
                      setCategoryName(category.categoryName);
                      setDescription(category.description);
                    }}
                    className="action-button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.categoryId)} // Ensure your backend supports deletion by ID
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;