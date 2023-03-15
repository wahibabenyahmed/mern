import cookies from 'js-cookie'



export const getCookie = (key)=>{
   
    return cookies.get(key);
    
}
export const deleteCookie = key=>{

    return cookies.remove(key);
}