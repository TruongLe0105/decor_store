import {
    Breadcrumbs,
    Container,
    Link,
    Typography,
    Box,
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import useCartContext from "../hooks/useCartContext";
// import CheckoutDelivery from "../components/CheckoutDelivery";
// import CheckoutSummary from "../components/CheckoutSummary";
import CartProductList from "../components/CartProductList";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getProductInCart } from "../features/cart/cartSlice";

const STEPS = ["Cart", "Delivery", "Summary"];

function CheckoutPage() {
    // const { cartProducts, dispatch } = useCartContext();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartId = user.cartId;

    const { cart } = useSelector(state => state.cart);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (cartId) {
            dispatch(getProductInCart({ cartId }))
        };
    }, [dispatch]);

    const handleStep = (step) => {
        setActiveStep(step);
    };

    return (
        <Container sx={{ my: 2 }}>
            <Breadcrumbs sx={{ mb: 4 }}>
                <Link underline="hover" color="inherit" component={RouterLink} to="/">
                    TitusScore
                </Link>
                <Typography color="text.primary">Checkout</Typography>
            </Breadcrumbs>

            <Stack spacing={2}>
                <Box sx={{ width: "100%" }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {STEPS.map((label, index) => (
                            <Step key={label}>
                                <StepButton onClick={() => handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {activeStep === 0 && <CartProductList cart={cart} setActiveStep={setActiveStep} />}
                {/* {activeStep === 1 && <CheckoutDelivery setActiveStep={setActiveStep} />}
                {activeStep === 2 && <CheckoutSummary />} */}
            </Stack>
        </Container>
    );
}

export default CheckoutPage;
