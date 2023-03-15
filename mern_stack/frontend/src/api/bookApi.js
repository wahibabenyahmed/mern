import axios from 'axios'
import { getCookie } from '../helpers/cookies';

export const createBook =async(newBook)=>{
    const token=getCookie('refreshToken');
  console.log('token',token);
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization':token
            
        }
    }
 const {data}=   await axios.post("http://localhost:5008/admin/add",newBook,config)
    return data
}

export const getAllBooks =async()=>{
  
  const {data} =  await axios.get("http://localhost:5008/admin/list",{withCredentials:true})
  return data
}

export const removeBook =async(id)=>{
    const token=getCookie('refreshToken');
  
    const config = {
        headers:{
           
            'Authorization':token 
        }
    }
  
    const {data}= await axios.delete(`http://localhost:5008/admin/delete/${id}`,config)
    return data
  }

  export const updateBook =async(newBook,id)=>{
    const token=getCookie('refreshToken');
//   console.log('token',token);
    const config = {
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization':token
            
        }
    }
 const {data}=   await axios.put(`http://localhost:5008/admin/update/${id}`,newBook,config)
    return data
}


