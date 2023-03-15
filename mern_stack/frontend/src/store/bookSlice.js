import {createSlice} from '@reduxjs/toolkit'


const bookSlice = createSlice({
    name:'books',
    initialState:[],
    reducers:{
        setBooks:(state,action)=>{
            return action.payload
        },
        deleteBook :(state,action)=>{
            state=state.filter((el)=>el._id !== action.payload)
            return state
        }
        
    }
})


export const {setBooks,deleteBook} = bookSlice.actions;
export default bookSlice.reducer