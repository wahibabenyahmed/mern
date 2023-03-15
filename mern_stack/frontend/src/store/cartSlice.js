import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        let find = state.cart.findIndex((item) => item._id === action.payload._id);
        if (find >= 0) {
          state.cart[find].bookQuantity += 1;
        } else {
          state.cart.push(action.payload);
        }
      },
      setItems:(state,action)=>{
       state.items = action.payload
      },
  
      getCartTotal: (state) => {
        let { totalQuantity, totalPrice } = state.cart.reduce(
          (cartTotal, cartItem) => {
            // console.log("carttotal", cartTotal);
            // console.log("cartitem", cartItem);
            const { bookPrice, bookQuantity } = cartItem;
            // console.log(price, quantity);
            const itemTotal = bookPrice * bookQuantity;
            cartTotal.totalPrice += itemTotal;
            cartTotal.totalQuantity += bookQuantity;
            return cartTotal;
          },
          {
            totalPrice: 0,
            totalQuantity: 0,
          }
        );
        state.totalPrice = parseInt(totalPrice.toFixed(2));
        state.totalQuantity = totalQuantity;
      },
  
      removeItem: (state, action) => {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      },
      removeAllItems:(state,action)=>{
       state.cart=[]      
      },
      increaseItemQuantity: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload) {
            return { ...item, bookQuantity: item.bookQuantity + 1 };
          }
          return item;
        });
      },
      decreaseItemQuantity: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item._id === action.payload) {
            return {  ...item, bookQuantity: item.bookQuantity - 1  };
          }
          return item;
        });
      },
    },
  });
  
  export const {
    addToCart,
    getCartTotal,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    setItems,
    removeAllItems
  } = cartSlice.actions;
  
  export default cartSlice.reducer;
  