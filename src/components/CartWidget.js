import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WidgetStyle = styled(RouterLink)(({ theme }) => ({
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    right: "10px",
    top: "10px",
    height: "40px",
    width: "40px",
    padding: "8px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    color: theme.palette.text.primary,
    cursor: "pointer",
}));

function CartWidget() {
    const [showCartIcon, setShowCartIcon] = useState(true)
    const { cart } = useSelector(state => state.cart);
    const navigate = useNavigate();
    let cartArray = Object.keys(cart);
    const totalProducts = cartArray.length ? cart.products.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0) : 0;

    const handleClick = () => {
        setShowCartIcon(false)
        // navigate("/checkout")
        console.log(showCartIcon)
    }
    return (
        <div onClick={() => setShowCartIcon(false)}>
            <WidgetStyle
                to="/checkout"
            >
                {/* {showCartIcon && ( */}
                <Badge badgeContent={totalProducts} color="success">
                    <ShoppingCartIcon />
                </Badge>
                {/* )} */}
            </WidgetStyle>
        </div>
    );
}

export default CartWidget;
