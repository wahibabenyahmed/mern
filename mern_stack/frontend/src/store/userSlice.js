import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name:'user',
    initialState:[],
    reducers:{
        setUsers:(state,action)=>{
            return action.payload
        },
        changeStatus:(state,action)=>{
            const toggle = state.find(el => el._id === action.payload);  
            toggle.isBlocked = !toggle.isBlocked;
        
        },
        RemoveUser:(state,action)=>{
         
              state = state.filter((user) => user._id !== action.payload)
          return state
        }

        
    }
})


export const {setUsers,changeStatus,RemoveUser} = userSlice.actions;
export default userSlice.reducer