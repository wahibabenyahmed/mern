
import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../api/bookApi';
import SideBar from '../../components/SideBar';



const AddBooks = () => {
 
  const [newBook,setNewBook] = useState({
    bookName:"",
    bookQuantity:"",
    bookAuthor:"",
    bookImage:"",
    bookPdf:"",
    bookPrice:"",
    bookDescription:""
  })

  const navigate = useNavigate()
  const handleChange =(e)=>{
setNewBook({...newBook,[e.target.name]:e.target.value})
   
  }
  const handlePicture = (e)=>{
    setNewBook({...newBook,bookImage:e.target.files[0]})
   
  } 
  const handlePdf = (e)=>{
    setNewBook({...newBook,bookPdf:e.target.files[0]})
   
  } 
  
  

const handleSubmit = async(e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('bookName',newBook.bookName)
  formData.append('bookQuantity',newBook.bookQuantity)
  formData.append('bookAuthor',newBook.bookAuthor)
  formData.append('bookImage',newBook.bookImage)
  formData.append('bookPdf',newBook.bookPdf)
  formData.append('bookPrice',newBook.bookPrice)
  formData.append('bookDescription',newBook.bookDescription)

 await createBook(formData).then((response)=>{
 setNewBook({
  bookName:"",
  bookQuantity:"",
  bookAuthor:"",
  bookImage:"",
  bookPdf:"",
  bookDescription:"",
  bookPrice:""
}) 
navigate('/admin')
 }).catch((err)=>{
  console.log(err);
 })
 
}
  return (
    <div>
    <SideBar/>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}}>
      <div style={{width:"30%"}}>
      <div style={{height:"400px",display:"flex",flexDirection:"column",justifyContent:"space-around",alignContent:"center"}} >
      <h1> Add  a new Book</h1>
      <TextField id="outlined-basic" label="bookName" variant="outlined" name="bookName" onChange={handleChange} />
      <TextField id="outlined-basic" label="bookQuantity" variant="outlined" type="number" name="bookQuantity" onChange={handleChange} />
      <TextField id="outlined-basic" label="bookAuthor" variant="outlined" name="bookAuthor" onChange={handleChange} />
      <TextField id="outlined-basic" label="bookImage" variant="outlined" type="file" name="bookImage" onChange={handlePicture} />
      <TextField id="outlined-basic" label="bookPdf" variant="outlined" type="file" name="bookPdf" onChange={handlePdf} />
      <TextField id="outlined-basic" label="bookPrice" variant="outlined" type="number" name="bookPrice" onChange={handleChange} />
      <TextField id="outlined-basic" label="bookDescription" variant="outlined" type="text" name="bookDescription" onChange={handleChange} />

      <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={(e)=>{handleSubmit(e)}}>Add</Button>
      
    </Stack>
    </div>
    </div>
    </div>
    </div>
  )
}

export default AddBooks