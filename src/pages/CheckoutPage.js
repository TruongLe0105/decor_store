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
import CartProductList from "../components/CartProductList";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getProductInCart } from "../features/cart/cartSlice";
import CheckoutDelivery from "../components/CheckoutDelivery";
import CheckoutSummary from "../components/CheckoutSummary";


const STEPS = ["Giỏ hàng", "Địa chỉ", "Thanh toán"];

function CheckoutPage() {
    // const { cartProducts, dispatch } = useCartContext();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartId = user.cartId;

    let { cart } = useSelector(state => state.cart);
    let cartProducts = Object.keys(cart) ? cart.products : [];
    console.log("cartProdcuts", cartProducts)
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (cartId) {
            dispatch(getProductInCart())
        };
    }, [dispatch]);

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
                    <Link underline="hover" color="inherit" sx={{ fontSize: "1.5rem" }} component={RouterLink} to="/">
                        TitusScore
                    </Link>
                    <Typography color="text.primary">Thanh Toán</Typography>
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
                    {activeStep === 1 && <CheckoutDelivery cartId={cart._id} setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <CheckoutSummary />}
                </Stack>
            </Container>
        </>
    );
}

export default CheckoutPage;
