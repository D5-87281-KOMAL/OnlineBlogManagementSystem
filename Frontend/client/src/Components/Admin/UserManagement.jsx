import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function UserManagement() {
  const [bloggers, setBloggers] = useState([]);

  useEffect(() => {
    fetchBloggers();
  }, []);

  const fetchBloggers = () => {
    axios.get('http://localhost:8000/user/get-all')
      .then(response => {
        let data = response.data.userList; // Adjust according to your backend response structure
        if (!Array.isArray(data)) {
          data = [data]; // In case it's not an array, wrap it in an array
        }
        setBloggers(data);
      })
      .catch(error => {
        console.error('There was an error fetching the bloggers!', error);
        setBloggers([]); // Set to empty array in case of error
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/user/${id}`)
      .then(response => {
        alert(response.data.message); // Show success message
        fetchBloggers(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
        alert('Failed to delete user');
      });
  };

  return (
    <div className="App" style={{ margin: 5 }}>
      <h1>Bloggers</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bloggers.map((blogger) => (
              <TableRow
                key={blogger.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {blogger.id}
                </TableCell>
                <TableCell align="center">{blogger.name}</TableCell>
                <TableCell align="center">{blogger.email}</TableCell>
                <TableCell align="center">{blogger.phoneNumber}</TableCell>
                <TableCell align="center">{blogger.role}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(blogger.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;