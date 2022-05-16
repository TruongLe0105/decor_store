import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Box, Typography, Divider } from '@mui/material'
import React from 'react'
import { FTextField, FormProvider } from '../../components/form'
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { updatePassword } from "./userSlice";

const UpdateUserSchema = yup.object().shape({
    password: yup.string().required("Nhập mật khẩu cũ"),
    newPassword: yup.string().required("Nhập mật khẩu mới"),
    ConfirmNewPassword: yup.string()
        .required("Please confirm your password")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

function PasswordForm() {
    const { user } = useAuth();

    const isLoading = useSelector((state) => state.user.isLoading);
    const defaultValues = {
        password: "",
        newPassword: "",
        ConfirmNewPassword: "",
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });
    const {
        //   setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log("data", data)
        dispatch(updatePassword({ userId: user._id, ...data }));
    };

    return (
        <Box>
            <Typography sx={{ textAlign: "left", fontSize: "1.2rem", margin: 1, marginLeft: "40px" }}>Đổi Mật Khẩu</Typography>
            <Card sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 2,
                width: "80%",
            }} >
                <Box sx={{ width: "40%", margin: 2, textAlign: "center" }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <FTextField sx={{ margin: 2 }} name="password" label="Mật Khẩu Hiện Tại" type="password" />
                        <FTextField sx={{ margin: 2 }} name="newPassword" label="Mật Khẩu Mới" type="password" />
                        {/* <FTextField sx={{ margin: 2 }} name="ConfirmNewPassword" label="Xác Nhận Mật Khẩu Mới" type="password" /> */}
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            // loading={isSubmitting || isLoading}
                            sx={{ marginTop: 2, }}
                        >
                            Xác Nhận
                        </LoadingButton>
                    </FormProvider>
                </Box>
            </Card>
        </Box >
    )
}

export default PasswordForm;