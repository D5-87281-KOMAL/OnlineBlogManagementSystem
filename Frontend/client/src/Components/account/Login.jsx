import Logo from './logo.png';

import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.4);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '20px 0 0'
});

const Wrapper = styled(Box)`
    padding: 5px 20px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 5px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmpassword:'',
    profilePicture:'',
    phoneNumber:'',
    role:'BLOGGER',
    SubscriptionStatus:"INACTIVE",


};


const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    const id = localStorage.getItem('id')
   

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            console.log("API Response:", response);  // Debugging
    
            // Fix: Check response.data.status instead of response.status
            if (response.data.status === 200) {  
                showError('');
    
                // Extract token & role from response.data
                const { token, role } = response.data;
                console.log("Extracted Role:", response.data);  // Debugging
    
                localStorage.setItem('accessToken', `Bearer${token}`);
                localStorage.setItem('role',response.data.role);
                localStorage.setItem('expirationTime',response.data.expirationTime);
                localStorage.setItem('id',response.data.user.id);
                localStorage.setItem('profilePicture',response.data.user.profilePicture);
                localStorage.setItem("name",response.data.user.name);
                setAccount({ name: login.email,role ,id});

        
                setLogin(loginInitialValues);
    
                // Role-based redirection
                if (role === 'BLOGGER') {
                    console.log('Navigating to /home');
                    navigate('/home');
                } else if (role === 'ADMIN') {
                    console.log('Navigating to /admin');
                    navigate('/admin');
                } else {
                    toast.error('Invalid role. Contact admin.');
                }
            } else {
                console.log("Login Failed:", response.data.message);
                toast.error(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };
    
    
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        console.log(response);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Image src={Logo} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.email} onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='confirmpassword' label='Confirm Password' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='phoneNumber' label='Enter Phone number' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='role' label='Enter Role' />
                            <TextField variant="filled" onChange={(e) => onInputChange(e)} name='profilePicture' label='Enter profilePicture Url' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;

