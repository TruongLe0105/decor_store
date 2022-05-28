import { Badge } from "@mui/material";
import React, { useEffect } from "react";
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../../hooks/useAuth";
import { getProductInCart } from "../../../features/user/cart/cartSlice";





function CartWidget() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart } = useSelector(state => state.cart);
    let products = cart ? cart.products : [];

    useEffect(() => {
        if (user) {
            dispatch(getProductInCart())
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalProducts = products?.length > 0 ? products.length : 0;

    return (
        <>
            <Badge
                sx={{
                    mt: { md: 1, sm: 0, xs: 1 },
                    cursor: "pointer",
                    mr: 2
                }}
                badgeContent={user ? totalProducts : ""}
                color="secondary"
                onClick={() => navigate("/checkout")}
            >
                <ShopOutlinedIcon sx={{
                    color: "#0097a7",
                    width: { xs: "25px", sm: "30px", md: "35px" },
                    height: { xs: "25px", sm: "30px", md: "35px" }
                }} />
            </Badge>
        </>
    );
}

export default CartWidget;
