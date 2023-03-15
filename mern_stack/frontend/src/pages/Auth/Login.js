import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { isAuthenticated, setAuthentification } from '../../helpers/auth';

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

export default function Login() {
  const [value,setValue]=useState({email:"",password:""})
  console.log(value);
  const navigate=useNavigate();
  const generateError=(error)=>{
    toast.error(error,{position:"top-right"})
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
     await axios.post("http://localhost:5008/users/login",{...value},{withCredentials:true})
      .then((response)=>{
        console.log(response);
       
        setAuthentification(response.data.findUser);
     
        if(isAuthenticated() && isAuthenticated().role ==='admin'){
          console.log('redirect to admin');
          navigate('/admin')
        }else{
          console.log('redirect to userProfile');
          navigate('/user')
        }
    
      })
    }
    catch(err){
      const error = err.response.data.msg
      generateError(error)
      console.log('errror',err);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={(e)=>handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              // autoComplete="current-password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link as ={Link} to='/register' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>            
   
    </ThemeProvider>
  );
}