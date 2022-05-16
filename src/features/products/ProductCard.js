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
import { useDispatch } from 'react-redux';

import { fCurrency } from '../../utils/numberFormat';
import DialogProduct from '../../components/DialogProduct'
import { addProductsToCart } from '../cart/cartSlice';
import useAuth from '../../hooks/useAuth';
import { LIMIT_QUANTITY_PRODUCT } from '../../app/config';
import { toast } from 'react-toastify';

function ProductCard({ product, cart }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const HandleAddToCart = () => {
        if (user) {
            const cartId = cart._id;
            const productId = product._id;
            const productInCartCurrent = cart.products.find(productCart => productCart._id === productId);
            let productInCart = productInCartCurrent ? productInCartCurrent.quantity + 1 : 1;
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
            maxWidth: 345,
            minHeight: 390,
        }}>
            <CardMedia
                component="img"
                height="250"
                image={product.imageUrl}
                alt={product.name}
                sx={{
                    position: "absolute",
                    top: 0,
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/products/${product._id}`)}
            />
            <CardContent sx={{
                position: "absolute",
                top: "78%",
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
                        fontWeight: "bold"
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
                        sx={{ marginRight: 1 }}
                        variant="outlined"
                        onClick={() => HandleAddToCart()}
                    >
                        <AddShoppingCartIcon />
                    </Button>
                    <DialogProduct cart={cart} product={product} />
                </Box>
            </CardActions>
        </Card>
    );
}

export default ProductCard;