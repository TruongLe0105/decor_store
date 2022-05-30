import {
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
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

import { addProductsToCart } from "../../../features/user/cart/cartSlice";
import { LIMIT_QUANTITY_PRODUCT } from "../../../app/config";
import { fCurrency } from "../../../utils/numberFormat";
import { useNavigate } from "react-router-dom";


function CartProductList({ cart, setActiveStep }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartId = cart._id;

    const handleDeleteProduct = ({ productId }) => {
        // cart.products.filter(product => product._id !== productId)
        // console.log(cart.products)
        const quantity = -100;
        if (cartId) {
            dispatch(addProductsToCart({ productId, cartId, quantity }))
        }
    };
    const handleActiveStep = () => {
        if (cart?.products.length > 0) {
            setActiveStep((step) => step + 1);
        }
    }

    return (
        <Box
            sx={{
                mt: 2,
                px: 1,
                bgcolor: "white"
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead >
                        <TableRow
                            sx={{
                                display: "flex",
                                height: { xs: "35px", sm: "45px" },
                            }}>
                            <TableCell
                                sx={{
                                    fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                                    width: "100%",
                                }}
                            >Sản phẩm</TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                                    width: "100%",
                                    textAlign: { xs: "right", sm: "none" }
                                }}
                            >Số lượng</TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                                    width: "100%",
                                    textAlign: { xs: "none", sm: "center", md: "left" }
                                }}
                            >Đơn giá</TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                                    width: "100%",
                                    mr: { xs: 2, sm: 1 },
                                }}
                            >Tổng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        {cart?.products?.map(({
                            _id: productId,
                            name,
                            price,
                            imageUrl,
                            quantity
                        }) => (
                            <TableRow key={productId}
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        alignItems: { xs: "flex-start", md: "center" },
                                    }}
                                >
                                    <Box
                                        onClick={() => navigate(`/products/${productId}`)}
                                        sx={{
                                            cursor: "pointer",
                                            borderRadius: { xs: 1, sm: 2 },
                                            width: { xs: "45px", sm: "70px", md: "100px" },
                                            height: { xs: "45px", sm: "70px", md: "100px" },
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt="product"
                                            width="100%"
                                            height="100%"
                                        />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                                            ml: { xs: 0, md: 1 },
                                            fontFamily: "monospace",
                                        }}
                                    >{name}</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: "flex",
                                        width: "100%",
                                        ml: 1
                                    }} >
                                    <QuantityCounter
                                        dispatch={dispatch}
                                        quantity={quantity < LIMIT_QUANTITY_PRODUCT ? quantity : LIMIT_QUANTITY_PRODUCT}
                                        cartId={cartId}
                                        productId={productId}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
                                        alignItems: "center",
                                        display: "flex",
                                        width: "100%"
                                    }}>{fCurrency(price)}đ</TableCell>
                                <TableCell
                                    sx={{
                                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                        alignItems: "center",
                                        display: "flex",
                                        width: "100%",
                                        mr: { xs: 1, sm: 0 }
                                    }}
                                >{fCurrency(price * quantity)}đ

                                    <DeleteForeverIcon
                                        sx={{
                                            color: "red",
                                            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.5rem" },
                                            ml: 1,
                                        }}
                                        onClick={() => handleDeleteProduct({ productId })} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mr: { xs: 3, sm: 12, md: "14%" },
                    margin: 1
                }}
            >
                <InventoryOutlinedIcon
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }
                    }}
                />
                <Typography
                    sx={{
                        color: "#008e97",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                        mr: { xs: 0, md: 3 },
                    }}
                >{fCurrency(cart.totalPrice)}đ
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: { md: 3, xs: 0 },
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                        margin: { md: 4, xs: 1 }
                    }}
                    onClick={() => handleActiveStep()}
                >
                    Tiếp theo
                </Button>
            </Box>
        </Box >
    );
};

function QuantityCounter({ dispatch, quantity, productId, cartId }) {
    // const [value, setValue] = useState(quantity)
    const handleDescQuantity = () => {
        if (quantity !== 1) {
            // setValue(value + 1)
            quantity = -1;
            if (cartId) dispatch(addProductsToCart({ productId, cartId, quantity }))
        }
    };
    const handleIncQuantity = () => {
        if (quantity < LIMIT_QUANTITY_PRODUCT) {
            // setValue(value + 1)
            if (cartId) dispatch(addProductsToCart({ productId, cartId }))
        }
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
        }}>
            <IndeterminateCheckBoxIcon sx={{
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                color: "red",
                display: "flex",
            }} onClick={() => handleDescQuantity()} />
            <Typography
                sx={{
                    fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" }
                }}
            >{quantity}</Typography>
            <AddBoxIcon onClick={() => handleIncQuantity()}
                sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                    color: "green"
                }}
            />
        </Box>
    );
}

export default CartProductList;
