import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, FTextField } from "./form";
import { Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { setDelivery } from "../features/user/cart/cartSlice";

const DeliverySchema = yup.object().shape({
  address: yup.string().required("Nhập địa chỉ nhận hàng "),
  receiver: yup.string().required("Nhập họ tên người nhận"),
  numberOfPhone: yup.number().required("Nhập số điện thoại người nhận"),
});


function CheckoutDelivery({ setActiveStep }) {
  const defaultValues = {
    address: "",
    receiver: "",
    numberOfPhone: "",
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
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: { md: "350px", xs: "200px" } }}>
          <Typography sx={{
            fontSize: { xs: "1.4rem", md: "1.4rem" }
          }} textAlign="center">
            Địa chỉ nhận hàng
          </Typography>
          <FTextField name="receiver" label="Họ Tên" fontSize="0.2rem" />
          <FTextField name="numberOfPhone" label="Số Điện Thoại" />
          <FTextField name="address" multiline rows={2} label="Địa Chỉ" />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            sx={{ fontSize: { xs: "1.2rem", md: "1.2rem" } }}
          >
            Đặt Hàng
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default CheckoutDelivery;
