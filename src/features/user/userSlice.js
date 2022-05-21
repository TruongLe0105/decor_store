import apiService from "../../app/apiService";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";


const initialState = {
    isLoading: false,
    error: null,
    updatedProfile: null,
    currentUser: null,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateUserProfileSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;

            state.updatedProfile = action.payload;
        },
        updatePasswordSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;

            state.updatePassword = action.payload;
        },
        getCurrentUserProfileSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            state.currentUser = action.payload;
        },
        addNewAddressUserSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;

            state.userAddress = action.payload;
        },
        updateAddressSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const userAddress = action.payload;
            state.currentUser = userAddress;
        },
        deleteAddressSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const addressId = action.payload;
            state.currentUser.orderAddress = state.currentUser.orderAddress.filter(address => address._id !== addressId);
        },
    }
});

export default slice.reducer;

export const updateUserProfile =
    ({
        fullName,
        avatarUrl,
        city,
        country,
        numberOfPhone,
    }) => async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const data = {
                fullName,
                city,
                country,
                numberOfPhone,
            }
            if (avatarUrl instanceof File) {
                const imageUrl = await cloudinaryUpload(avatarUrl);
                data.avatarUrl = imageUrl;
            }
            const response = await apiService.put(`/users/me/update`, data);
            dispatch(slice.actions.updateUserProfileSuccess(response.data));
            toast.success("Update Profile successfully");

        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };

export const getCurrentUserProfile = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get("/users/me");
        dispatch(slice.actions.getCurrentUserProfileSuccess(response.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updatePassword = ({ userId, password, newPassword }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(`/users/me/password`, {
            password,
            newPassword
        })
        dispatch(slice.actions.updatePasswordSuccess(response.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const addNewAddressUser = ({ receiver, address, numberOfPhone }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post(`/users/me/address/add`, {
            receiver, address, numberOfPhone
        });
        dispatch(slice.actions.addNewAddressUserSuccess(response.data));
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const updateAddress = ({ receiver, address, numberOfPhone, addressId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        console.log("add", addressId)
        const response = await apiService.put(`/users/address/${addressId}`, {
            receiver, address, numberOfPhone
        });
        dispatch(slice.actions.updateAddressSuccess(response.data));
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const deleteAddress = ({ addressId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        await apiService.delete(`/users/address/${addressId}`)
        dispatch(slice.actions.deleteAddressSuccess({ addressId }));
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}