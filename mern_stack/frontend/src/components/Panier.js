import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCartTotal, removeAllItems} from "../store/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import BookAtBag from './BookAtBag';
import { Button } from '@mui/material';
import { createCart } from '../api/UserApi';
import { getCookie } from '../helpers/cookies';
import { toast } from 'react-toastify';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Panier() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
      );
const dispatch = useDispatch()
 const token = getCookie('refreshToken');
 
 //no token case message 
 const generateError = (error)=>{
  toast.error(error,{position:"bottom-right"})
 }

// req cart for a user 
  const handleCart = async()=>{
    if(token){
      await createCart({cart})
    .then((response)=>{
      console.log(response);
      dispatch(removeAllItems())
      console.log('caaart',cart);
    }).catch((err)=>{
      console.log(err);
    })
    }else{
      generateError('you must be looged in to buy something')
    }
    
  }
      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));
    
    
      React.useEffect(() => {
        dispatch(getCartTotal());
      }, [cart]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
        <Toolbar>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
        <IconButton aria-label="cart">
        <StyledBadge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon />
        </StyledBadge>
         </IconButton>
          </IconButton>
          </Toolbar>
      
      <Main open={open}>
        <DrawerHeader />
       
      </Main>
      <Drawer
        sx={{
          width: 180,
          flexShrink: 2,
          '& .MuiDrawer-paper': {
            width: 350,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          cart Items
        </DrawerHeader>
        <Divider />
        <List>
        {cart.map((el,index)=>{
            return (
                <div key={index}>
                <BookAtBag book={el} />
                <Divider/>
                </div>
            )
        })}
        </List>
        <Divider />
        <List>
        <Box >
        <div style={{display:"flex" , flexDirection:"column"}}>
        <div style={{textAlign:"center"}}>
        TotalQuantity :{totalQuantity}  
        </div>  
        <div style={{textAlign:"center"}}>
            TotalPrice:<strong> {totalPrice} TND</strong>
        </div>
        <Button onClick={()=>handleCart()}> checkout</Button>
        </div>
        </Box>
        </List>
        
      </Drawer>
    </Box>
  );
}