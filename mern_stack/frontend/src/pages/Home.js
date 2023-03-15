import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBooks } from '../store/bookSlice';
import BookCard from '../components/BookCard';
import NavbarUser from '../components/NavbarUser';


const Home = () => {
  const books = useSelector((state)=>state.Book);
  const dispatch = useDispatch();
  console.log(books);

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
    <>
    <NavbarUser/>
    <div style={{
      display: "flex",
     
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center"
      }}>
        {/* <Panier/> */}
      {books.map((element,index)=>{
        return (
          <div key={index}>
            <BookCard element={element}/>
          </div>
        )
      })}       
    </div>
    </>
  )
}

export default Home