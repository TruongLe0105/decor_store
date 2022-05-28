import { useForm } from "react-hook-form";
// import * as yup from "yup";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Box } from '@mui/material'
import React from 'react'
import { FTextField, FormProvider } from '../../components/form'
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { updatePassword } from "./userSlice";

const UpdateUserSchema = Yup.object().shape({
    password: Yup.string().required("Nhập mật khẩu cũ"),
    newPassword: Yup.string().required("Nhập mật khẩu mới"),
    ConfirmNewPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
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
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(updatePassword({ userId: user._id, ...data }));
        reset();
    };

    return (
        <Box sx={{ padding: 1 }}>
            <Card sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
                <Box
                    sx={{
                        width: { xs: "80%", md: "40%" },
                        margin: 2,
                        textAlign: "center"
                    }}
                >
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <FTextField sx={{
                            margin: { xs: 0, md: 2 },
                            paddingBottom: { xs: 2, md: 0 }
                        }}
                            name="password" label="Mật Khẩu Hiện Tại" type="password" />
                        <FTextField sx={{
                            margin: { xs: 0, md: 2 },
                            paddingBottom: { xs: 2, md: 0 }
                        }}
                            name="newPassword" label="Mật Khẩu Mới" type="password" />
                        <FTextField sx={{
                            margin: { xs: 0, md: 2 },
                            paddingBottom: { xs: 2, md: 0 }
                        }}
                            name="ConfirmNewPassword" label="Xác Nhận Mật Khẩu Mới" type="password" />
                        <LoadingButton
                            sx={{ fontSize: { xs: "0.6rem", md: "0.9rem" } }}
                            type="submit"
                            variant="contained"
                            loading={isSubmitting || isLoading}
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