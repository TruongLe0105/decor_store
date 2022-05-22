import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    usersById: {},
    currentPageUsers: [],
    totalUsers: null,

    ordersById: {},
    currentPageOrders: [],
    currentStatusOder: null,
    totalOrders: null,
};

const slice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetProducts(state) {
            state.productsById = {};
            state.currentPageProducts = [];
        },
        resetOrders(state) {
            state.ordersById = {};
            state.currentPageOrders = [];
        },
        getListOfUsersSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { users, count } = action.payload;
            users.forEach(user => {
                state.usersById[user._id] = user;
            })
            state.currentPageUsers = users.map(user => user._id);
            state.totalUsers = count;
        },
        getListOfOrderSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { orders, count } = action.payload;
            orders.forEach(order => {
                state.ordersById[order._id] = order;
            })
            state.currentPageOrders = orders.map(order => order._id);
            state.totalOrders = count;
        },
        updateOrderByAdminSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { order } = action.payload;
            state.currentStatusOder = order.status;
        }
    }
});

export default slice.reducer;
export const { resetOrders } = slice.actions;

export const getListOfUsers = ({ userName, page, limit }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { limit, page };
        if (userName) params.userName = userName;
        const response = await apiService.get("/auth/list", { params })
        dispatch(slice.actions.getListOfUsersSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const getListOfOrder = ({ receiver, limit, page, status }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { limit, page };
        if (status) params.status = status;
        if (receiver) params.receiver = receiver;
        const response = await apiService.get(`/auth/orders`, {
            params
        });
        dispatch(slice.actions.getListOfOrderSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateOrderByAdmin = ({ status, orderId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/auth/${orderId}`, { status });
        dispatch(slice.actions.updateOrderByAdminSuccess(response.data));
        // dispatch(resetOrders());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}