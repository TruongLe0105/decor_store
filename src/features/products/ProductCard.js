import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Link } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { fCurrency } from '../../utils/numberFormat';
import DialogProduct from '../../components/DialogProduct'
import { addProductsToCart } from '../cart/cartSlice';
import useAuth from '../../hooks/useAuth';
import { LIMIT_QUANTITY_PRODUCT } from '../../app/config';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { cart } = useSelector(state => state.cart);
    let productsCart = Object.keys(cart).length > 0 ? cart.products : [];


    const HandleAddToCart = () => {
        if (user) {
            const cartId = user.cartId;
            const productId = product._id;
            const productsCartCurrent = productsCart.find(productCart => productCart._id === productId);
            let productInCart = productsCartCurrent ? productsCartCurrent.quantity + 1 : 1;
            if (productInCart <= LIMIT_QUANTITY_PRODUCT) {
                dispatch(addProductsToCart({ productId, cartId }))
                toast.success("Sản phẩm đã được thêm vào giỏ hàng")
            } else {
                toast.error(`Bạn chỉ được mua tối đa ${LIMIT_QUANTITY_PRODUCT} sản phẩm này`)
            };
        } else {
            navigate("/login")
        }
    }

    return (
        <Card sx={{
            maxWidth: { xs: "200px", md: "340px" },
            minHeight: { xs: "210px", md: "380px" },
        }}>
            <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                sx={{
                    height: { xs: "140px", md: "250px" },
                    position: "absolute",
                    top: 0,
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/products/${product._id}`)}
            />
            <CardContent sx={{
                position: "absolute",
                top: "75%",
                width: "100%",
                textAlign: "center"
            }}>
                <Link
                    sx={{
                        cursor: "pointer",
                        color: "black",
                        fontFamily: "Helvetica",
                        blur: "5px"
                    }}
                    component={RouterLink}
                    to={`/products/${product._id}`}
                >
                    {product.name}
                </Link>
                <Typography
                    sx={{
                        color: "red",
                        fontFamily: "serif",
                        fontSize: { xs: "0.6rem", md: "1.2rem" }
                    }}
                >
                    {fCurrency(product.price)}đ

                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    position: "absolute",
                    top: "70%",
                    textAlign: "center",
                    width: "100%",
                    height: "10%"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                    <Button
                        sx={{
                            marginRight: { xs: 0, md: 1 },
                            border: {
                                xs: "none", md: "1px solid #C4CDD5"
                            }
                        }}
                        onClick={() => HandleAddToCart()}
                    >
                        <AddShoppingCartIcon sx={{ fontSize: { xs: "0.7rem", md: "1.1rem" } }} />
                    </Button>
                    <DialogProduct product={product} />
                </Box>
            </CardActions>
        </Card >
    );
}

export default ProductCard;