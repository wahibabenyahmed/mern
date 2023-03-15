import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import NavbarUser from '../../components/NavbarUser'
import { setBooks } from '../../store/bookSlice'
import BookCard from '../../components/BookCard'


const UserProfile = () => {
  const books = useSelector((state)=>state.Book);
  console.log('books:',books);
 
  const dispatch = useDispatch();
  const getAllBooks = async()=>{
    await axios.get("http://localhost:5008/admin/list",{withCredentials:true})
    .then((response)=>{
      dispatch(setBooks(response.data.bookList))
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getAllBooks()
   
  },[])
  return (      

    <div>
      <NavbarUser/>
      <div style={{
        display: "flex",
       
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
        }}>
        {books.map((element,index)=>{
          return (
            <div key={index}>
              <BookCard element={element}/>
            </div>
          )
        })}       
      </div>
    </div>
  )
}

export default UserProfile