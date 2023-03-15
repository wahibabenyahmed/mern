import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MBookDetails({book}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`/Public/books/${book.bookImage}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {book.bookName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           {book.bookAuthor}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {book.bookDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}