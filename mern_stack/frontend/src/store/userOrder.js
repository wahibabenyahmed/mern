import {createSlice} from '@reduxjs/toolkit'


const cartDetails = createSlice({
    name:'cartDetail',
    initialState:[{
        name:"riadh"
    }],
    reducers:{
       setDetails:(state,action)=>{
        return action.payload
       }

        
    }
})


export const {setDetails} = cartDetails.actions;
export default cartDetails.reducer