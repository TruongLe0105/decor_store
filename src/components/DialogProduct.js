import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PreviewIcon from '@mui/icons-material/Preview';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Card, CardMedia, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



function DialogProduct({ product }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(1)
    const navigate = useNavigate();

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
        handleClose();
        navigate("/cart")
    }

    const handleAddAmount = () => {
        setValue(value + 1);
    }

    const handleRemoveAmount = () => {
        setValue(value - 1)
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
                            backgroundColor: "black",
                            color: "white"
                        }}
                    >
                        {product.name}
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
                        <div>
                            <DialogContentText sx={{
                                color: "red",
                                fontSize: "2rem"
                            }}
                            >{product.price}đ
                            </DialogContentText>
                            <Typography sx={{ fontWeight: "bold" }}>Số lượng</Typography>
                            <Button variant="link" onClick={handleAddAmount}>
                                <AddIcon />
                            </Button>
                            <input
                                style={{
                                    width: "15%",
                                    height: "10%",
                                    textAlign: "center",
                                    border: "1px solid gray",
                                    margin: 1,
                                    borderRadius: "5px"
                                }}
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                            <Button variant="link" onClick={handleRemoveAmount}>
                                <RemoveIcon />
                            </Button>
                            <DialogActions sx={{ marginRight: 0 }}>
                                <Button
                                    onClick={handleAddToCart}
                                    sx={{ backgroundColor: "black" }}
                                >
                                    <AddShoppingCartIcon sx={{ margin: 1 }} />
                                    <Typography
                                        sx={{ color: "white" }}
                                        onClick={() => navigate("/cart")}
                                    >THÊM VÀO GIỎ</Typography>
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