// import { Box } from '@mui/material';
// import './App.css';
// import React from 'react';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Login from './Components/account/Login';
// import DataProvider from './context/DataProvider';
// import Home from './Components/home/Home';
// import CreatePost from './Components/create/CreatePost';
// import Contact from './Components/contact/Contact';
// import About from './Components/about/About';
// import LogOut from './Components/account/LogOut';
// import DetailView from './Components/details/DetailsView';
// import Update from './Components/create/Update';
// import Subscribe from './Components/subscribe/Subscribe';
// import Profile from './Components/profile/Profile';
// import WithOutLoginHome from './Components/home/WithOutLoginHome';
// import Admin from './Components/Admin/Admin';
// import CategoryAdmin from './Components/Admin/CategoryAdmin';
// import Profiles from './service/ProfileUpdate';
// import CategorySelection from './Components/create/CategorySelection';
// import PostDetails from './Components/home/post/PostDetails';
// import UserManagement from './Components/Admin/UserManagement';
// import PostManagement from './Components/Admin/PostManagement';
// import Post from './Components/home/post/Post';
// import CommentManagement from './Components/Admin/CommentManagement';
// import EditPost from './Components/home/post/EditPost';
// import YourPosts from './Components/home/post/YourPosts';

// function App() {

  
//   return (
//     <div> 
//      <DataProvider>
//       <BrowserRouter>
//         <Box>
//           <Routes>
//           <Route path='/' element={<WithOutLoginHome/>}/>
//           <Route path='/login' element={<Login />} />
//             <Route path='/home' element={<Home />} />
//             <Route path='/create' element={<CreatePost/>} />
//             <Route path='/details/:id' element={<DetailView />} />
//             <Route path='/update/:id' element={<Update />} />
//             <Route path='/about' element={<About />} />
//             <Route path='/contact' element={<Contact />} />
//             <Route path='/subscribe' element={<Subscribe/>}/>
//             <Route path='/profile' element={<Profile/>}/>
//             <Route path='/logout' element={<LogOut/>}/>
//             <Route path="/admin" element={<Admin />} />
//             <Route path='/category' element={<CategoryAdmin/>}/>
//             <Route path='/profiles' element={<Profiles/>}/>
//             <Route path='/heyId' element={<CategorySelection/>}/>
//             <Route path="/post/:postId" element={<PostDetails />} />
//             <Route path="/bloggers" element={<UserManagement />} />
//             <Route path="/post" element={<PostManagement />} />
//             <Route path="/save" element={<Post />} />
//             <Route path="/comment" element={<CommentManagement/>}/>
//             <Route path="/edit-post/:postId" element={<EditPost />} />
//             <Route path="/your-posts" element={<YourPosts />} />

//           </Routes>
//         </Box>
//       </BrowserRouter>
//     </DataProvider>
//     </div>

//   );
// }

// export default App;




import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/account/Login';
import DataProvider from './context/DataProvider';
import Home from './Components/home/Home';
import CreatePost from './Components/create/CreatePost';
import Contact from './Components/contact/Contact';
import About from './Components/about/About';
import LogOut from './Components/account/LogOut';
import DetailView from './Components/details/DetailsView';
import Subscribe from './Components/subscribe/Subscribe';
import Profile from './Components/profile/Profile';
import WithOutLoginHome from './Components/home/WithOutLoginHome';
import Admin from './Components/Admin/Admin';
import CategoryAdmin from './Components/Admin/CategoryAdmin';
import Profiles from './service/ProfileUpdate';
import CategorySelection from './Components/create/CategorySelection';
import PostDetails from './Components/home/post/PostDetails';
import UserManagement from './Components/Admin/UserManagement';
import PostManagement from './Components/Admin/PostManagement';
import Post from './Components/home/post/Post';
import CommentManagement from './Components/Admin/CommentManagement';
import EditPost from './Components/home/post/EditPost';
import YourPosts from './Components/home/post/YourPosts';
import PaymentPage from './Components/payment/PaymentPage';
import Sucess from './Components/payment/Sucess';
import Success from './Components/payment/Sucess';
import HopeUI from './Components/Admin/Dashboard';


function App() {


  // Replace this with your actual authentication logic
  const isAuthenticated = localStorage.getItem('accessToken') !== null;


  const ProtectedRoute = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      
      return <Navigate to="/login" replace />;
    }
  
    // Render the child routes if authenticated
    return <Outlet />;
  };

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Box>
            <Routes>
              <Route path="/" element={<WithOutLoginHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/pay" element={<PaymentPage />} />
              <Route path="/pa" element={<Success />} />
              <Route path="/dashboard" element={<HopeUI />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/details/:id" element={<DetailView />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/category" element={<CategoryAdmin />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/heyId" element={<CategorySelection />} />
                <Route path="/post/:postId" element={<PostDetails />} />
                <Route path="/bloggers" element={<UserManagement />} />
                <Route path="/post" element={<PostManagement />} />
                <Route path="/save" element={<Post />} />
                <Route path="/comment" element={<CommentManagement />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
                <Route path="/your-posts" element={<YourPosts />} />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;