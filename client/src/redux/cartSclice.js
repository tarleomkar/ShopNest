import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItem')) : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.produtId === item.produtId);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.produtId === existingItem.produtId ? item : x
                );
            } else {
                state.cartItems.push(item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.produtId !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems')
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;