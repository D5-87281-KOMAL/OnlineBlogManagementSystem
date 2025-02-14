// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

// const ProtectedRoute = () => {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Adjust according to your state management

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;