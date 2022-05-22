import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, FTextField, FUploadAvatar } from '../../components/form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from './userSlice';
import { fData } from '../../utils/numberFormat';
import { LoadingButton } from '@mui/lab';

const UpdateUserSchema = yup.object().shape({
    fullName: yup.string().required("Nhập họ và tên"),
});

function ProfileForm() {
    const { user } = useAuth();

    const isLoading = useSelector(state => state.user.isLoading);

    const defaultValues = {
        userName: user?.userName || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        numberOfPhone: user?.numberOfPhone || "",
        country: user?.country || "",
        city: user?.city || "",
        avatarUrl: user?.avatarUrl || "",
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    "avatarUrl",
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    const onSubmit = (data) => {
        dispatch(updateUserProfile({ userId: user._id, ...data }));
    };

    return (
        <Box >
            <Typography sx={{
                fontSize: { xs: "1rem", md: "1.5rem" },
                textAlign: "center"
            }}>Hồ sơ của tôi</Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <Grid container sx={{ marginTop: 1 }}>
                    <Grid item xs={12} md={8}>
                        <Card
                            sx={{
                                height: "280px",
                                py: { xs: 2, md: 4 },
                                px: { xs: 4, md: 2 },
                                textAlign: "center",
                                display: "grid",
                                rowGap: { xs: 0, md: 2 },
                                columnGap: 2,
                                gridTemplateColumns: {
                                    xs: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)",
                                },
                            }}
                        >
                            <FTextField name="userName" label="Tên Đăng Nhập" disabled />
                            <FTextField name="email" label="Email" disabled />
                            <FTextField name="fullName" label="Họ Tên" />
                            <FTextField name="country" label="Quốc Gia" />
                            <FTextField name="city" label="Thành Phố" />
                            <FTextField name="numberOfPhone" label="Số Điện Thoại" />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{
                            py: { xs: 1, md: 7 },
                            textAlign: "center",
                            height: { xs: "200px", md: "280px" },
                        }}>
                            <FUploadAvatar
                                name="avatarUrl"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: { xs: 0, md: 2 },
                                            mx: "auto",
                                            display: "block",
                                            textAlign: "center",
                                            color: "text.secondary",
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Card>
                    </Grid>
                    <Stack alignItems="center" sx={{ margin: 1, textAlign: "center", width: "100%" }}>
                        <LoadingButton
                            sx={{ fontSize: { xs: "0.6rem", md: "1rem" } }}
                            type="submit"
                            variant="contained"
                            loading={isSubmitting || isLoading}
                        >
                            Lưu
                        </LoadingButton>
                    </Stack>
                </Grid>
            </FormProvider>
        </Box>
    )
}

export default ProfileForm;