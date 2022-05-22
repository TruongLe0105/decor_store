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
    };

    return (
        <>
            {admin && (
                <Box sx={{
                    textAlign: "right",
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
                maxWidth: { xs: "200px", md: "340px" },
                minHeight: { xs: "210px", md: "380px" },
            }}>
                <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                        height: { xs: "150px", md: "250px" },
                        position: "absolute",
                        cursor: "pointer",

                    }}
                    onClick={() => navigate(`/products/${product._id}`)}
                />
                <CardContent sx={{
                    position: "absolute",
                    top: { xs: "69%", md: "72%" },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Link
                        sx={{
                            cursor: "pointer",
                            color: "black",
                            fontFamily: "Helvetica",
                            blur: "5px",
                            fontSize: { xs: "0.6rem", md: "1.1rem" },
                            mb: 1
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
                            fontSize: { xs: "0.5rem", md: "1.2rem" }
                        }}
                    >
                        {fCurrency(product.price)}đ

                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        position: "absolute",
                        top: { xs: "71%", md: "68%" },
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
        </>
    );
}

export default ProductCard;