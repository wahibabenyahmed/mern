
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks } from '../../api/bookApi'

import SideBar from '../../components/SideBar'
import SingleBookCard from '../../components/SingleBook'
import { setBooks } from '../../store/bookSlice'

const Admin = () => {
  const bookLists = useSelector((state)=>state.Book)
  
  const dispatch = useDispatch();

  const listOfBooks = async()=>{
    await getAllBooks().then((response)=>{
      dispatch(setBooks(response.bookList))
      
// console.log(response.bookList);
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
  listOfBooks()
  
  },[])

  return (
    <div style={{marginLeft:"18%"}}>
    <SideBar/>
    <div className='contenaire'>
      <h1 style={{textAlign:"center"}}>Admin page</h1>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
        {bookLists.map((el,index)=>{
          return(
            <div key={index}>
              <SingleBookCard book ={el}/>
            </div>
          )
        })}
      </div>
    </div>
    </div>
    
  )
}

export default Admin