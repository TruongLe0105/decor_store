import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth"
import { getProductInCart } from "../features/cart/cartSlice";

const WidgetStyle = styled(RouterLink)(({ theme }) => ({
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    right: "15px",
    height: { xs: "10px", md: "40px" },
    width: { xs: "10px", md: "40px" },
    padding: "4px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    cursor: "pointer",
}));

function CartWidget() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart } = useSelector(state => state.cart);
    let products = cart ? cart.products : [];

    useEffect(() => {
        if (user) {
            dispatch(getProductInCart())
        }
    }, []);

    const totalProducts = products?.length > 0 ? products.length : 0;

    return (
        <Badge
            sx={{
                position: "fixed",
                zIndex: 999,
                right: 8,
                cursor: "pointer"
            }}
            badgeContent={totalProducts}
            color="secondary"
            onClick={() => navigate("/checkout")}
        >
            <ShopOutlinedIcon sx={{
                color: "#0097a7",
                width: { xs: "20px", md: "35px" },
                height: { xs: "20px", md: "35px" }
            }} />
        </Badge>
    );
}

export default CartWidget;
