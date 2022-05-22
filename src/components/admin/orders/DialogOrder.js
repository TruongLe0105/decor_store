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
    Dialog,
} from "@mui/material";
import React, { useState } from "react";
import ListIcon from '@mui/icons-material/List';

import { fCurrency } from '../../../utils/numberFormat';

function DialogOrder({ products }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box>
                <ListIcon
                    sx={{
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        color: "green",
                        cursor: "pointer"
                    }}
                    onClick={() => setOpen(true)}
                />
            </Box>
            {open && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <TableContainer>
                        <Table>
                            <TableHead sx={{
                                bgcolor: "black",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <TableRow sx={{
                                    display: "flex",
                                    height: { xs: "35px", md: "45px" },
                                    width: { xs: "95%", md: "95%" }
                                }}>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.6rem", md: "1rem" },
                                            color: "white",
                                            width: "100%",
                                        }}>Sản phẩm</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.6rem", md: "1rem" },
                                            color: "white",
                                            width: "100%"
                                        }}>Tên</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.6rem", md: "1rem" },
                                            color: "white",
                                            width: "100%"
                                        }}>Số lượng</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.6rem", md: "1rem" },
                                            color: "white",
                                            width: "100%"
                                        }}
                                    >Đơn giá</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.6rem", md: "1rem" },
                                            color: "white"
                                        }}
                                    >Tổng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{

                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "column",
                            }}>
                                {products.length !== 0 && products.map(({ _id, name, price, imageUrl, quantity }) => (
                                    <TableRow
                                        key={_id}
                                        sx={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <TableCell sx={{
                                            width: "100%",
                                            justifyContent: "center"
                                        }}>
                                            <Box sx={{
                                                height: "100%",
                                                overflow: "hidden",
                                                borderRadius: 3
                                            }}>
                                                <img
                                                    src={imageUrl}
                                                    alt="product"
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%"
                                            }}>
                                            <Typography sx={{ fontSize: { xs: "0.5rem", md: "1rem" } }}>
                                                {name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%"
                                        }} >
                                            <Typography sx={{
                                                fontSize: { xs: "0.5rem", md: "1rem" },
                                            }}>
                                                {quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { xs: "0.5rem", md: "1rem" },
                                                alignItems: "center",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                width: "100%",

                                            }}>
                                            {fCurrency(price)}đ
                                        </TableCell>
                                        <TableCell sx={{
                                            fontSize: { xs: "0.5rem", md: "1rem" },
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%"
                                        }}>
                                            {fCurrency(price * quantity)}đ
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, }}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                fontSize: { xs: "0.6rem", md: "1rem" },
                                mb: 1,
                                mr: 1
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Dialog >
            )}
        </>
    );
};

export default DialogOrder;
