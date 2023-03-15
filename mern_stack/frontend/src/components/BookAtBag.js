import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {
    
    removeItem,
    decreaseItemQuantity,
    increaseItemQuantity,
  } from "../store/cartSlice";
import { useDispatch } from 'react-redux';

export default function BookAtBag({book}) {
  const theme = useTheme();
  const dispatch = useDispatch()
  
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {book.bookName}
          </Typography>
          
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
           <SkipPreviousIcon   onClick={() =>
                              dispatch(decreaseItemQuantity(book._id))
                            }/>
          </IconButton>
          
          <Typography component="div" variant="h5">
          {book.bookQuantity}         
           </Typography>
         
        
          <IconButton aria-label="next">
             <SkipNextIcon onClick={() =>
                              dispatch(increaseItemQuantity(book._id))
                            }/>
          </IconButton>
          <IconButton aria-label="next">
             <DeleteForeverIcon onClick={() =>
                              dispatch(removeItem(book._id))
                            }/>
          </IconButton>

          
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`/Public/books/${book.bookImage}`}
        alt="Live from space album cover"
      />
    </Card>
  );
}