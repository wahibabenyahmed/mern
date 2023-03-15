import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function OrderDetail({detail}) {
    
    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {detail.createdAt}
        </Typography>
        <Typography variant="h5" component="div">
          {detail.cartTotal} <strong>TND</strong>
        </Typography>
       <Button variant='outlined'>Payement</Button>
      </CardContent>
      
    </Card>
  );
}