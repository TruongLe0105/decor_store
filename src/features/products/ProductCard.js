import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fCurrency } from '../../utils/numberFormat';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Button, Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import DialogProduct from '../../components/DialogProduct';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const handleAddToCart = () => {
        console.log("chưa làm!!!")
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
                        onClick={handleAddToCart}
                    >
                        <AddShoppingCartIcon />
                    </Button>
                    <DialogProduct product={product} />
                </Box>
            </CardActions>
        </Card>
    );
}

export default ProductCard;