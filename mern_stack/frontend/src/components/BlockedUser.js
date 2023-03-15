import * as React from 'react';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



export default function BlockedUserCard({user}) {
    const number = user.filter((el)=>{
        return el.isBlocked === true
      }).length
  return (
    <Card sx={{ maxWidth: 380,mb: 3.5  }}>
      <CardContent>
        
        <Typography variant="h5" component="div">
            {(number > 1)? 'Blocked Users' : 'Blocked User' }
         
        </Typography>
        <Typography sx={{ mb: 1.5,fontSize:28,textAlign:"center" }} color="text.secondary">
          {number}
        </Typography>
        
      </CardContent>
      
    </Card>
  );
}