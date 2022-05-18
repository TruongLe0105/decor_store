import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PreviewIcon from '@mui/icons-material/Preview';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardMedia, Link, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { addProductsToCart } from '../features/cart/cartSlice';
import useAuth from '../hooks/useAuth';
import { fCurrency } from '../utils/numberFormat';
import { toast } from 'react-toastify';
import { LIMIT_QUANTITY_PRODUCT } from '../app/config';



function DialogProduct({ product, cart }) {
    // function DialogProduct({ product, cartId }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartId = cart._id;


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDetail = () => {
        handleClose();
        navigate(`/products/${product._id}`)
    }

    const handleAddToCart = () => {
        if (user) {
            const productId = product._id;
            let quantity = Number(value);
            const productInCartCurrent = cart.products.find(productCart => productCart._id === productId);
            let productInCart = productInCartCurrent ? (productInCartCurrent.quantity + quantity) : quantity;
            console.log("quantity", quantity)
            console.log(("productInCart"), productInCart)
            if (productInCart <= LIMIT_QUANTITY_PRODUCT && productInCart > 0) {
                handleClose();
                if (cartId) {
                    dispatch(addProductsToCart({ productId, cartId, quantity }))
                }
                toast.success(`Thành công! Bạn đã có ${productInCart} sản phẩm này trong giỏ hàng`);

            } else {
                if (productInCart > LIMIT_QUANTITY_PRODUCT) {
                    toast.error(`Giới hạn mỗi sản phẩm là ${LIMIT_QUANTITY_PRODUCT}!`);
                }
                setValue(1);
            }
        } else {
            navigate("/login");
        }
    }

    const handleAddAmount = () => {
        if (value < 100) {
            setValue(value + 1);
        }
    }

    const handleRemoveAmount = () => {
        if (value > 1) {
            setValue(value - 1)
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <PreviewIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <Card sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>

                    <DialogTitle id="alert-dialog-title"
                        sx={{
                            backgroundColor: "#212121",
                            color: "white"
                        }}
                    >
                        {product.name.toUpperCase()}
                    </DialogTitle>
                    <Card sx={{ display: "flex" }}>
                        <CardMedia
                            component="img"
                            src={product.imageUrl}
                            sx={{
                                width: "30%",
                                height: "30%",
                                margin: 2,
                                borderRadius: 1
                            }}
                        />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <DialogContentText sx={{
                                color: "red",
                                fontSize: "2rem"
                            }}
                            >{fCurrency(product.price)}đ
                            </DialogContentText>
                            <Typography sx={{ fontWeight: "bold" }}>Số lượng:</Typography>
                            <Box sx={{ display: "flex" }}>
                                <Button variant="link" onClick={handleRemoveAmount}>
                                    <RemoveIcon />
                                </Button>
                                <input
                                    style={{
                                        width: "15%",
                                        height: "100%",
                                        textAlign: "center",
                                        border: "1px solid gray",
                                        margin: 1,
                                        borderRadius: "5px"
                                    }}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                />
                                <Button variant="link" onClick={handleAddAmount}>
                                    <AddIcon />
                                </Button>
                            </Box>
                            <DialogActions>
                                <Button
                                    onClick={handleAddToCart}
                                    color="secondary"
                                    variant="outlined"
                                >
                                    <AddShoppingCartIcon sx={{ margin: 1 }} />
                                    <Typography>THÊM VÀO GIỎ</Typography>
                                </Button>
                                <Typography sx={{ margin: 1 }}>Hoặc</Typography>
                                <Link
                                    onClick={handleOpenDetail}
                                    underline="none"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Xem chi tiết
                                </Link>
                            </DialogActions>
                        </div>
                    </Card>
                </Card>
            </Dialog>
        </div>
    );
}

export default DialogProduct;


