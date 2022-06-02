import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { FormProvider, FTextField } from "../../form";
import { setDelivery } from "../../../features/user/cart/cartSlice";
import useAuth from "../../../hooks/useAuth";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const DeliverySchema = yup.object().shape({
  address: yup.string().min(10, "Địa chỉ chưa đủ yêu cầu").max(100).required("Nhập địa chỉ nhận hàng"),
  receiver: yup.string().min(4).max(50).required("Nhập tên người nhận"),
  numberOfPhone: yup.number().required("Nhập số điện thoại người nhận"),
});


function CheckoutDelivery({ setActiveStep }) {
  const { user } = useAuth();

  const defaultValues = {
    address: user?.address || "",
    receiver: user?.fullName || "",
    numberOfPhone: user?.numberOfPhone || "",
  };
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  const methods = useForm({
    defaultValues: window.localStorage.getItem("defaultAddress")
      ? JSON.parse(window.localStorage.getItem("defaultAddress"))
      : defaultValues,
    resolver: yupResolver(DeliverySchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = (data) => {
    setActiveStep((step) => step + 1);
    window.localStorage.setItem("defaultAddress", JSON.stringify(data));
    dispatch(setDelivery({ ...data }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
        bgcolor: "white",
        mt: 2
      }}
    >
      <ArrowBackRoundedIcon
        onClick={() => setActiveStep((step) => step - 1)}
        sx={{
          cursor: "pointer",
          color: "green",
          fontSize: "2rem"
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}
          sx={{
            width: { md: "350px", xs: "200px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.4rem" }
            }}
            textAlign="center"
          >
            Địa chỉ nhận hàng
          </Typography>
          <FTextField name="receiver" label="Họ Tên" fontSize="0.2rem" />
          <FTextField name="numberOfPhone" label="Số Điện Thoại" />
          <FTextField name="address" multiline rows={2} label="Địa Chỉ" />
        </Stack>
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            sx={{
              fontSize: { xs: "0.7rem", sm: "1.1rem" },
            }}
          >
            Đặt Hàng
          </LoadingButton>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
