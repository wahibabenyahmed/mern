import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import { getCookie } from '../helpers/cookies';
import axios from "axios"
import {toast} from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setItems } from '../store/cartSlice';




function BookCard({element}) {
  const items = useSelector((state) => state.allCart.cart);
  console.log('cart',items);
//   const books = useSelector((state) => state.Book);
//   console.log('books',books);
// console.log(items);
  const dispatch = useDispatch();
    const navigate = useNavigate()

    const [value,setValue] = useState(null)
    // console.log(value);
     const generateInfo=(msg)=>{
      toast.info(msg,{position:"bottom-right"})
    }
    const generateSucess=(msg)=>{
      toast.success(msg,{position:"bottom-right"})
    }
    
   const handleRating = async(id,value)=>{
  
    const token=getCookie('refreshToken');
  
    const config = {
        headers:{
            
            'Authorization':token
            
        }
    }
    
     await axios.put("http://localhost:5008/admin/rating",{prodId:id,star:value},config)
    .then((response)=>{
    console.log('response',response);
    if(response.data =="no token "){
      generateInfo('to rate this article you must be logged in')
    }else{
      generateSucess('Book rated with sucess')
    }
    
   
    
    
    }).catch((err)=>{
      console.log(err);
    })
    
   }
// useEffect(()=>{
// dispatch(setItems(books))
// },[])
   
  
  return (
   
      <Card className='cardbook' style={{ width:"280px", marginTop:"25px"}}>
        <Card.Img style={{ height: '16rem',cursor:'pointer' }}variant="top"  
        src={`/Public/books/${element.bookImage}`} 
        onClick={()=>{navigate(`/book/pdf/${element._id}`)}}/>
        <Card.Body style={{ display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Card.Title style={{ display:'flex', justifyContent:'center',textAlign:'center'}}>{element.bookName}</Card.Title>
        <Box
         sx={{
        '& > legend': { mt: 2 },
         }}
        >
       <Rating
        name="simple-controlled"
        value={element.totalrating}
        onChange={(e)=>{
        setValue(Number(e.target.value));
        return (value !== null)? handleRating(element._id,(value)):null
      }}
       />
      
    </Box>
    <Card.Text > {`${element.ratings.length}`} {(element.ratings.length >1)?'reviews':'review'}</Card.Text>
    
 
          <Card.Text >
          {element.bookPrice } TND
          </Card.Text>
          
          <Box >
            <Tooltip title="add to cart">
              <AddShoppingCartIcon  onClick={() => dispatch(addToCart(element))}/>
            </Tooltip>
            {/* <Tooltip title="add to wishlist">
              <FavoriteBorderIcon/> 
            </Tooltip> */}
          </Box>
          
        </Card.Body>
      </Card>
   
  
  );
}

export default BookCard;