import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, color, quantity, stock } = action.payload;
      const existingItem = state.find(item => item.id === id && item.color === color);
      if (existingItem) {
        if (existingItem.quantity + quantity <= stock) {
          existingItem.quantity += quantity;
        } else {
          // Handle stock limit exceeded
        }
      } else {
        if (quantity <= stock) {
          state.push(action.payload);
        } else {
          // Handle stock limit exceeded
        }
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id && i.color === action.payload.color);
      if (item && item.quantity < action.payload.stock) {
        item.quantity += 1;
      } else {
        // Handle stock limit exceeded
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id && i.color === action.payload.color);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => !(i.id === action.payload.id && i.color === action.payload.color));
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;