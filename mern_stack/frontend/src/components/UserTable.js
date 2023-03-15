import  React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { blockUser, deleteUser, unblockUser } from '../api/AdminApi';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, RemoveUser } from '../store/userSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function UserTables() {
  const user = useSelector((state)=>state.Users)
  const dispatch = useDispatch()
  
  const generateError=(error)=>{
    toast.warning(error,{position:"top-right"})
  }
  const generateSucess=(msg)=>{
    toast.success(msg,{position:"top-right"})
  }
  const handleBlock = async(Id)=>{
   const status = dispatch(changeStatus(Id))
   console.log(status);
   const users = user.find((el)=>{
   return el._id === Id
   })
    if(users.isBlocked){
      await unblockUser(Id).then((response)=>{
        generateSucess(response.message)
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      
      await blockUser(Id).then((response)=>{
        generateError(response.message)
        
      }).catch((err)=>{
        console.log(err);
      })
    }
    
   
  }

  // remove user 
  const handelRemove = async(ID)=>{
    dispatch(RemoveUser(ID));
    await deleteUser(ID).then((response)=>{
      generateSucess(response.msg)
     
      
    }).catch((err)=>{
      generateError("failed to remove this user")
    })

  }
  
 
  return (
    <div >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>identifiant</StyledTableCell>
            <StyledTableCell align="right">UserName</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">isBlocked</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Block</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.isBlocked.toString()}</StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
              <Button onClick={()=>handleBlock(row._id)} variant="outlined">{(row.isBlocked)? 'Unblock':'Block' }</Button>
              <StyledTableCell align="right">
              <Button onClick={()=>handelRemove(row._id)} variant="outlined">Remove</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  );
}