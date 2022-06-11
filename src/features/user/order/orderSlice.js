import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    orders: [],
    orderId: "",
    currentStatus: "",
};

const slice = createSlice({
    name: "order",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetOrderId(state) {
            state.orderId = "";
            state.orders = [];
        },
        getListOrderSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { orders } = action.payload;
            state.orders = orders;
        },
        updateOrderSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { order } = action.payload;
            state.orderId = order?._id;
            console.log("orders", state.orders)
        }
    }
});

export default slice.reducer;
export const { resetOrderId } = slice.actions;

export const getListOrder = ({ status }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = {};
        if (status) params.status = status;
        const response = await apiService.get("/orders/list", { params })
        dispatch(slice.actions.getListOrderSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateOrder = ({ status, orderId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/orders/${orderId}`, { status })
        dispatch(slice.actions.updateOrderSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const buyAgainOldOrder = ({ orderId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        await apiService.post("/orders/cart", { orderId });
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}