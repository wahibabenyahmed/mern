import { getCookie } from "../helpers/cookies";
import axios from 'axios'

export const createCart = async(cart)=>{
    const token=getCookie('refreshToken');
      console.log('token',token);
       
     const {data}=   await axios.post(`http://localhost:5008/users/cart`,{...cart},{headers:{
                
     'Authorization':token
     
 }})
        return data
}
export const getCartDetails = async()=>{
  const token=getCookie('refreshToken');
    console.log('token',token);
     
   const {data}=   await axios.get(`http://localhost:5008/users/singleUser`,{headers:{
              
   'Authorization':token
   
}})
      return data
}