import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    cart: {},
    delivery: {
        address: "",
        city: "",
        country: "",
        numberOfPhone: "",
    },
};

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetCart(state, action) {
            state.cart = {};
        },
        getProductsInCartSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;
            const { cart } = action.payload;
            state.cart = cart;
            // state.totalPrice = totalPrice;
        },
        addProductsTocartSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;
            const { cart } = action.payload;
            state.cart = cart;
        }
    }

});

export default slice.reducer;
export const { resetCart } = slice.actions;

export const getProductInCart = ({ cartId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get("/cart", { cartId });
        dispatch(slice.actions.getProductsInCartSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const addProductsToCart = ({ productId, quantity, cartId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
        if (!quantity) quantity = 1;
        console.log("quantity", quantity)
        const response = await apiService.post("/cart/add", { productId, quantity, cartId });
        dispatch(slice.actions.addProductsTocartSuccess(response.data));
        dispatch(getProductInCart());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}