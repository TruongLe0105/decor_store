import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/user/products/productSlice';
import cartReducer from '../features/user/cart/cartSlice';
import orderReducer from '../features/user/order/orderSlice';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        user: userReducer,
        admin: adminReducer,
    },
});
