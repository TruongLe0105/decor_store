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


import CheckoutDelivery from "../components/CheckoutDelivery";
import CheckoutSummary from "../components/CheckoutSummary";
import { getProductInCart } from "../features/user/cart/cartSlice";
import CartProductList from "../components/CartProductList";


const STEPS = ["Giỏ hàng", "Địa chỉ", "Thanh toán"];

function CheckoutPage() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartId = user.cartId;

    let { cart } = useSelector(state => state.cart);
    let cartProducts = Object.keys(cart) ? cart.products : [];
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (cartId) {
            dispatch(getProductInCart())
        };
    }, [dispatch, cartId]);

    const handleStep = (step) => {
        if (cartProducts.length > 0) {
            setActiveStep(step);
        }
    };

    return (
        <>
            <Container sx={{
                mt: 9
            }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link underline="hover" color="inherit" sx={{ fontSize: { xs: "0.7rem", md: "1.5rem" } }} component={RouterLink} to="/">
                        TitusScore
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: { xs: "0.7rem", md: "1.5rem" } }}>Thanh Toán</Typography>
                </Breadcrumbs>

                <Stack>
                    <Box sx={{ display: { xs: "none", md: "block" }, width: { xs: "70%", md: "100%" }, }}>
                        <Stepper nonLinear activeStep={activeStep}>
                            {STEPS.map((label, index) => (
                                <Step key={label}>
                                    <StepButton sx={{ width: { xs: "76px", md: "86px" } }} onClick={() => handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    {activeStep === 0 && <CartProductList cart={cart} setActiveStep={setActiveStep} />}
                    {activeStep === 1 && <CheckoutDelivery cartId={cart._id} setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <CheckoutSummary />}
                </Stack>
            </Container>
        </>
    );
}

export default CheckoutPage;
