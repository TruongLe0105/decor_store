import {
    Breadcrumbs,
    Container,
    Link,
    Typography,
    Box,
    Stack,
    Stepper,
    Step,
    StepButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getProductInCart } from "../features/user/cart/cartSlice";
import CartProductList from "../components/customers/cart/CartProductList";
import CheckoutDelivery from "../components/customers/checkout/CheckoutDelivery";
import CheckoutSummary from "../components/customers/checkout/CheckoutSummary";


const STEPS = ["Giỏ hàng", "Địa chỉ", "Thanh toán"];

function CheckoutPage() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartId = user.cartId;

    let { cart } = useSelector(state => state.cart);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (cartId) {
            dispatch(getProductInCart())
        };
    }, [dispatch, cartId]);

    // const handleStep = (step) => {
    //     if (cart?.products?.length > 0) {
    //         setActiveStep(step);
    //     }
    // };

    return (
        <Box
            sx={{
                mb: 4,
                mt: 8,
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    py: 2,
                    pl: 5,
                    pr: 5,
                    bgcolor: "white"
                }}
            >
                <Breadcrumbs separator="|" >
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{
                            fontSize: "1.6rem",
                            color: "#008e97"
                        }}
                        component={RouterLink}
                        to="/">
                        TitusScore
                    </Link>
                    <Typography
                        color="text.primary"
                        sx={{
                            fontSize: "1.3rem",
                            color: "#008e97"
                        }}
                    >Thanh toán</Typography>
                </Breadcrumbs>
                <Stepper
                    nonLinear
                    activeStep={activeStep}
                    sx={{ mt: 1 }}
                >
                    {STEPS.map((label, index) => (
                        <Step key={label}>
                            <StepButton>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Container>
                <Stack>

                    {activeStep === 0 && <CartProductList cart={cart} setActiveStep={setActiveStep} />}
                    {activeStep === 1 && <CheckoutDelivery cartId={cart._id} setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <CheckoutSummary />}
                </Stack>
            </Container>
        </Box>
    );
}

export default CheckoutPage;
