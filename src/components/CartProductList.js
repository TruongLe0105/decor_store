import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Box,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../features/cart/cartSlice";
import { LIMIT_QUANTITY_PRODUCT } from "../app/config";

import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { fCurrency } from "../utils/numberFormat";

function CartProductList({ cart, setActiveStep }) {
    const dispatch = useDispatch();
    const cartId = cart._id;
    let productsInCart = [];
    if (cart.products)
        productsInCart = cart.products;

    const handleDeleteProduct = ({ productId }) => {
        const quantity = -100;
        if (cartId) {
            dispatch(addProductsToCart({ productId, cartId, quantity }))
        }
    };
    const handleActiveStep = () => {
        if (productsInCart.length > 0) {
            setActiveStep((step) => step + 1)
        }
    }

    return (

        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell>Tổng</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsInCart.length !== 0 && productsInCart.map(({ _id: productId, name, price, imageUrl, quantity }) => (
                            <TableRow key={productId}>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box
                                            sx={{
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                display: "flex",
                                                width: 64,
                                                height: 64,
                                                mr: "5px",
                                            }}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt="product"
                                                width="100%"
                                                height="100%"
                                            />
                                        </Box>
                                        <Typography variant="body2" >
                                            {name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <QuantityCounter
                                        dispatch={dispatch}
                                        quantity={quantity < LIMIT_QUANTITY_PRODUCT ? quantity : LIMIT_QUANTITY_PRODUCT}
                                        cartId={cartId}
                                        productId={productId}
                                    />
                                </TableCell>
                                <TableCell>{fCurrency(price)}đ</TableCell>
                                <TableCell>{fCurrency(price * quantity)}đ</TableCell>
                                <TableCell>
                                    <IconButton
                                        sx={{ color: "red" }}
                                        onClick={() => handleDeleteProduct({ productId })}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <TableCell />
                            <TableCell />
                            <TableCell >Tổng cộng:</TableCell>
                            <TableCell >{fCurrency(cart.totalPrice)}đ</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                    variant="contained"
                    // onClick={() => setActiveStep((step) => step + 1)}
                    onClick={() => handleActiveStep()}
                >
                    Tiếp theo
                </Button>
            </Box>
        </Box>
    );
};

function QuantityCounter({ dispatch, quantity, productId, cartId }) {
    const handleDescQuantity = () => {
        if (quantity !== 1) {
            quantity = -1;
            if (cartId) dispatch(addProductsToCart({ productId, cartId, quantity }))
        }
    };
    const handleIncQuantity = () => {
        if (quantity < LIMIT_QUANTITY_PRODUCT) {
            if (cartId) dispatch(addProductsToCart({ productId, cartId }))
        }
    }

    return (
        <Box sx={{ width: 96 }}>
            <IconButton
                onClick={() => handleDescQuantity()}
            >
                <IndeterminateCheckBoxIcon />
            </IconButton>
            {quantity}
            <IconButton
                sx={{ color: "#2ecc71" }}
                onClick={() => handleIncQuantity()}
            >
                <AddBoxIcon />
            </IconButton>
        </Box>
    );
}

export default CartProductList;
