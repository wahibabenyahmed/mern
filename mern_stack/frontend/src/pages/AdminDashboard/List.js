import React, { useEffect } from 'react'
import SideBar from '../../components/SideBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {  setUsers } from '../../store/userSlice'
import UserTables from '../../components/UserTable'
import InfoCard from '../../components/UserInfo'
import BlockedUserCard from '../../components/BlockedUser'

const List = () => {
const users = useSelector((state)=>state.Users)
const dispatch = useDispatch()


const getAllusers = async()=>{
    await axios.get("http://localhost:5008/users/all-users")
    .then((response)=>{
      dispatch(setUsers(response.data.filter((el)=>{
        return el.role !== "admin"
      })))
     
    }).catch((err)=>{
        console.log(err);
    })

   
}
useEffect(()=>{
getAllusers();

},[])


  return (
    <div>
    <SideBar/>
    <div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <div style={{width:500,display:"flex",justifyContent:"space-around"}}>
          <InfoCard user={users}/>
          <BlockedUserCard user={users}/>
        </div>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
            
            <UserTables  />
        </div>
    </div>
    </div>
  )
}

export default List