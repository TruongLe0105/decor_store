import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const WidgetStyle = styled(RouterLink)(({ theme }) => ({
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    right: "15px",
    // top: "10px",
    height: "40px",
    width: "40px",
    padding: "8px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    // color: theme.palette.text.secondary,
    cursor: "pointer",
}));

function CartWidget() {
    const { cart } = useSelector(state => state.cart);
    let cartArray = Object.keys(cart);
    // const totalProducts = cartArray.length ? cart.products.reduce((acc, cur) => {
    //     return acc + cur.quantity;
    // }, 0) : 0;

    const totalProducts = cartArray.length ? cart.products.length : 0;

    return (
        <WidgetStyle
            to="/checkout"
        >
            <Badge badgeContent={totalProducts} color="success">
                <ShoppingCartIcon />
            </Badge>
        </WidgetStyle>
    );
}

export default CartWidget;
