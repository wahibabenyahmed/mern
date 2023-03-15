import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import BasicRating from './Rating';
import { useNavigate } from 'react-router-dom';
import {  removeBook } from '../api/bookApi';
import { deleteBook } from '../store/bookSlice';
import {toast} from 'react-toastify';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



export default function SingleBookCard({book}) {
  
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()

  const generateSucess=(msg)=>{
    toast.success(msg,{position:"top-right"})
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
    const navigate = useNavigate();

    const handelRemove = async()=>{
    dispatch(deleteBook(book._id))
    await removeBook(book._id).then((response)=>{
      
      generateSucess('book removed with sucess')
    }).catch((err)=>{
      console.log(err);
    })
    
    }

  return (
    <div style={{marginTop:"50px"}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500], width: 80, height: 60}} aria-label="recipe">
        {book.bookPrice} د
          </Avatar>
        }
        action={
          <IconButton  onClick={()=>{handelRemove()}}aria-label="settings">
           
            <DoNotDisturbAltIcon  />
            
          </IconButton>
         
        }
        title={book.bookName}
        subheader={`Writen by ${book.bookAuthor}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/Public/books/${book.bookImage}`}
        alt="BookPic"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Stock :{book.bookQuantity}
        </Typography>
      </CardContent>
      <CardContent>
      <BasicRating book={book}/>
      <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={()=>{navigate(`/updateBook/${book._id}`)}}>Update</Button>
      
    </Stack>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {book.bookDescription}
          </Typography>
                  </CardContent>
      </Collapse>
    </Card>
 
    </div>
  );
}