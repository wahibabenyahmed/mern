
import axios from "axios"
import { getCookie } from '../helpers/cookies';

export const RateBook =async(rate)=>{
    const token=getCookie('refreshToken');
  console.log('token',token);
    const config = {
        headers:{
            
            'Authorization':token
            
        }
    }
 const {data}=   await axios.put("http://localhost:5008/admin/rating",{...rate},config)
    return data
}