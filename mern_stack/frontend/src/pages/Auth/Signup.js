import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Noun Library
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();
const Signup = () => {
  const [value,setValue]=useState({name:"",email:"",password:""})
  console.log(value);
  const navigate=useNavigate();
  //error bl toast
  const generateError=(error)=>{
      toast.error(error,{
          position:"top-right"
      })
  }
//handleSubmit
const handleSubmit= async(event)=>
{
  event.preventDefault();
  try
  {
      await axios.post('http://localhost:5008/users/register',{...value},{withCredentials:true})
      .then((response=>
      {
          console.log(response)
      }))
      .catch((err)=>
      {    
          const errors = err.response.data.errors
          console.log(errors[0].msg);
          generateError(errors[0].msg)
      })
  }
  catch(err){
      console.log(err);
  }
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          fontStyle={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={(e)=>handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
            />            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
/>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>            
    <ToastContainer/>
    </ThemeProvider>

)}


export default Signup