import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Link } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { grey } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { LIMIT_QUANTITY_PRODUCT } from '../../../app/config';
import { addProductsToCart } from '../cart/cartSlice';
import DeleteProduct from '../../../components/admin/products/DeleteProduct';
import UpdateProduct from '../../../components/admin/products/UpdateProducts';
import { fCurrency } from '../../../utils/numberFormat';
import DialogProduct from '../../../components/DialogProduct';

const cardStyle = {
    '&:hover': {
        bgcolor: grey[100],
        bottom: 1,
        boxShadow: `0 2px 6px 0`,
    }
};

function ProductCard({ product, admin }) {
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
        <>
            {admin && (
                <Box sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <DeleteProduct productId={product._id} />
                    <UpdateProduct product={product} />
                </Box>
            )}
            <Card sx={{
                ...cardStyle,
                position: "relative",
                maxWidth: { xs: "200px", sm: "340px", },
                minHeight: { xs: "250px", sm: "340px", md: "420px" },
            }}>
                <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                        position: "absolute",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                />
                <CardContent sx={{
                    position: "absolute",
                    top: { xs: "75%", sm: "74%", md: "72%" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Link
                        sx={{
                            cursor: "pointer",
                            color: "black",
                            fontFamily: "Helvetica",
                            blur: "5px",
                            fontSize: { md: "1.3rem", sm: "1rem", xs: "0.7rem" },
                            mb: { xs: 0, sm: 1 }
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
                            fontSize: { md: "1.3rem", sm: "1rem", xs: "0.7rem" },
                        }}
                    >
                        {fCurrency(product.price)}đ

                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        position: "absolute",
                        top: { xs: "70%", sm: "68%" },
                        width: "100%",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}>
                        {!admin && (
                            <Button
                                variant="outlined"
                                sx={{
                                    ...cardStyle,
                                    mr: 1,
                                }}
                                onClick={() => HandleAddToCart()}
                            >
                                <AddShoppingCartIcon sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }} />
                            </Button>
                        )}
                        <DialogProduct product={product} />
                    </Box>
                </CardActions>
            </Card >
        </>
    );
}

export default ProductCard;