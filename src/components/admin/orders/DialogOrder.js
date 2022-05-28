import {
    Typography,
    Button,
    Box,
    Dialog,
    Divider,
} from "@mui/material";
import React, { useState } from "react";
import ListIcon from '@mui/icons-material/List';

import { fCurrency } from '../../../utils/numberFormat';

function DialogOrder({ products, totalPrice }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box>
                <ListIcon
                    sx={{
                        fontSize: {
                            xs: "1rem", sm: "1.8rem", md: "2rem",
                        },
                        color: "green",
                        cursor: "pointer"
                    }}
                    onClick={() => setOpen(true)}
                />
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            padding: 2,
                            // mx: 1,
                            color: "white",
                            bgcolor: "black",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                width: "60%"
                            }}
                        >Sản phẩm</Typography>
                        <Box
                            sx={{
                                width: "40%",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                }}
                            >Đơn giá</Typography>
                            <Typography
                                sx={{
                                    fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                }}
                            >Tổng tiền</Typography>
                        </Box>
                    </Box>
                    {products?.map(({ _id, name, imageUrl, quantity, price }) => (
                        <Box key={_id}>
                            <Box
                                sx={{
                                    padding: 1,
                                    mx: 1,
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "60%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            width: { xs: "50px", sm: "100px" },
                                            height: { xs: "50px", sm: "100px" },
                                            overflow: "hidden",
                                            borderRadius: 1,
                                            mr: 1
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt="product"
                                            width="100%"
                                            height="100%"
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { md: "1.2rem", sm: "0.8rem", xs: "0.5rem" },
                                                mr: { xs: 3, sm: 0 },
                                                opacity: 0.7,
                                                fontFamily: "monospace"
                                            }}
                                        >{name}</Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.7rem" },
                                            }}
                                        >x{quantity}</Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "40%",
                                        ml: { xs: 0, sm: 8, md: 5 }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: { md: "1.1rem", sm: "0.7rem", xs: "0.5rem" },
                                            opacity: 0.7
                                        }}
                                    >{fCurrency(price)}đ</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.7rem" },
                                            color: "#008e97"
                                        }}
                                    >{fCurrency(price * quantity)}đ</Typography>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    ))}
                </Box>
                <Typography
                    sx={{
                        textAlign: "right",
                        mr: 2,
                        fontSize: { md: "1.4rem", sm: "1rem", xs: "0.8rem" },
                        color: "#008e97"
                    }}
                >{fCurrency(totalPrice)}đ</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: { md: 1, sm: 1, xs: 0 },

                }}>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" },
                            mb: 1,
                            mr: 1
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Dialog >
        </>
    );
};

export default DialogOrder;
