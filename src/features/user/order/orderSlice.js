import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    ordersById: {},
    currentPageOrders: [],
    currentStatusOder: null,
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
        resetOrders(state) {
            state.ordersById = {};
            state.currentPageOrders = [];
        },
        getListOrderSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { orders, totalPage } = action.payload;
            console.log(totalPage)
            orders?.forEach(order => {
                state.ordersById[order._id] = order;
            })
            state.currentPageOrders = orders.map(order => order._id);
            state.totalPage = totalPage;
        }
    }
});

export default slice.reducer;
export const { resetOrders } = slice.actions;

export const getListOrder = ({ page, limit, status }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { limit, page };
        console.log(status)
        if (status) params.status = status;
        const response = await apiService.get("/orders/list", { params })
        dispatch(slice.actions.getListOrderSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};