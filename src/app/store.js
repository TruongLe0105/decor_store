import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';
// import orderReducer from '../features/admin/adminSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        admin: adminReducer,
    },
});
