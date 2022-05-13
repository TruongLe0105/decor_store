import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    productsInCart: []
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
            state.productsInCart = [];
        },
        getProductsInCartSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;
            const { products, totalPrice } = action.payload;
            console.log("products", products)
            state.productsInCart = products;
            state.totalPrice = totalPrice;
        },
    }

});

export default slice.reducer;
export const { resetCart } = slice.actions;

export const getProductInCart = ({ _id }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/cart/list`, { _id });
        dispatch(slice.actions.getProductsInCartSuccess(response.data.cart));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

// export const addProductToCart = ({ }) => async (dispatch) => {
//     dispatch(slice.actions.startLoading);
//     try {
//         if (product)
//             const response = await apiService.post(`/cart/add`, {})
//     } catch (error) {

//     }
// }