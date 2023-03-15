import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { deleteCookie, getCookie } from '../helpers/cookies';
import Panier from './Panier'
import { useSelector } from 'react-redux';




const pages = [ {page:'Blog',link:"/blog"},{page:'Orders',link:"/orders"}];


function NavbarUser() {
  const { cart } = useSelector(
    (state) => state.allCart
      );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const navigate = useNavigate();
const token = getCookie('refreshToken');

const handelLogout = ()=>{
    localStorage.removeItem('user');
    deleteCookie('refreshToken');
    navigate('/')
  
  
    }
return (
  <>
    <AppBar position="sticky" style={{backgroundColor:'rgb(75,185,166)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/user" style={{textDecoration:"none",color:"white"}}>
           My Book
           </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
              {pages.map((page) => (
                <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                  
                  <Link to={page.link} style={{color:"black",textDecoration:"none"}}>
                  <Typography textAlign="center">{page.page}</Typography>
                 </Link>
                
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((item) => (
              <Button
                key={item.page}
                onClick={handleCloseNavMenu}
                
                
             >
              <Link to={item.link} style={{color:"white",textDecoration:"none"}}>
                {item.page}
              </Link>
              </Button>
            ))}
            
          </Box>
          <Panier/>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip  title= {(token)?"you want to logout?": "you have an account?"}>
              <IconButton onClick={handleOpenUserMenu} sx={{  iconLarge:'100px' }}>
                {(token)?<LogoutIcon/>:<LoginIcon/>}
              
              </IconButton>
            </Tooltip>
            <Menu
            
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  >
                {(token)?  <button onClick={()=>handelLogout()}>Logout </button>: <button onClick={()=>navigate('/login')}>Login </button>}
                  
                </MenuItem>            
     
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
   
  </>
);
}
export default NavbarUser;