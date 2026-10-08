import { createSlice } from "@reduxjs/toolkit";

const loadCartItems = () => {
    try {
        const raw = localStorage.getItem('cartItems');
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const initialState = {
    cartItems: loadCartItems(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (!Array.isArray(state.cartItems)) {
                state.cartItems = [];
            }
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.productId === item.productId);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.productId === existingItem.productId ? { ...x, ...item } : x
                );
            } else {
                state.cartItems.push(item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            if (!Array.isArray(state.cartItems)) {
                state.cartItems = [];
            }
            state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
