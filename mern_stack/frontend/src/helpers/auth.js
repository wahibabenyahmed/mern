
import { getCookie } from "./cookies";
import {setLocalStorage, getLocalStorage } from "./localStorage";

export const setAuthentification = (user)=>{
   
    setLocalStorage('user',user)
    }


export const isAuthenticated =()=>{
    const cookie = getCookie('refreshToken')
    console.log('coockie',cookie);
    
if( (cookie && getLocalStorage('user'))){
  return getLocalStorage('user'); 

    
}else{
    return false;
}
}