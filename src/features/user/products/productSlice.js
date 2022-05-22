import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    productsById: {},
    currentPageProducts: [],
    singleProductChanged: null,
    quantityProducts: null,
};

const slice = createSlice({
    name: "product",
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
        getProductsSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { products, count, totalPage } = action.payload;
            products.forEach((product) => {
                state.productsById[product._id] = product;
                if (!state.currentPageProducts.includes(product._id))
                    state.currentPageProducts.push(product._id);
            });
            state.totalProducts = count;
            state.totalPage = totalPage;
        },
        getProductDetailSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            state.productsById = action.payload;
            state.currentPageProducts = [];
        },
        addProductByAdminSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { product } = action.payload;
            state.singleProductChanged = product;
        },
        updateProductByAdminSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { product } = action.payload;
            state.singleProductChanged = product;
        },
        deleteProductByAdminSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { products } = action.payload;
            state.quantityProducts = products?.length
        },
    },
}
);

export default slice.reducer;
export const { resetProducts } = slice.actions;

export const getProducts = ({ sortBy, categories, name, page, limit }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { page, limit };
        if (name) params.name = name;
        if (categories) params.categories = categories;
        if (sortBy) params.sortBy = sortBy;
        const response = await apiService.get(`/products`, {
            params,
        });
        dispatch(resetProducts());
        dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const getProductDetail = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/products/${id}`);
        dispatch(slice.actions.getProductDetailSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const addProductByAdmin = ({ price, imageUrl, quantity, categories, name, description }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post("/products/add", {
            name, price, quantity, categories, description, imageUrl
        });
        dispatch(slice.actions.addProductByAdminSuccess(response.data));
        toast.success("Success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateProductByAdmin = ({
    productId,
    name,
    categories,
    quantity,
    description,
    price,
    imageUrl,
}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/products/${productId}`, {
            name,
            categories,
            quantity,
            description,
            price,
            imageUrl
        });
        dispatch(slice.actions.updateProductByAdminSuccess(response.data));
        toast.success("Success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const deleteProductByAdmin = ({ productId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(`/products/${productId}`)
        dispatch(slice.actions.deleteProductByAdminSuccess(response.data));
        toast.success("Success!")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

