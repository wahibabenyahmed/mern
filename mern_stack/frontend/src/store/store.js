import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';
import cartSlice from './cartSlice';
import userSlice from './userSlice';
import cartDetails from './userOrder'

export default configureStore({
    reducer:{
        Book:bookSlice,
        Users: userSlice,
        allCart: cartSlice,
        cartDetail: cartDetails
    }
})