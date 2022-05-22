import {
    Box,
    Container,
    Divider,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOrder } from "../../../features/user/order/orderSlice";
import { fCurrency } from "../../../utils/numberFormat";

function OrderForm({ status }) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const { ordersById, currentPageOrders, totalPage } = useSelector(state => state.order);
    const orders = currentPageOrders.map((orderId) => ordersById[orderId]);

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    };

    useEffect(() => {
        console.log("status", status)
        console.log(page)
        dispatch(getListOrder({ page, status, limit: 2 }))
    }, [page, dispatch, status])


    return (
        <Container>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: { xs: "0.7rem", md: "1.5rem" },
                    my: 1
                }}
            >Đơn hàng của tôi</Typography>
            <Divider />
            {orders.length > 0 && orders.map(({
                _id,
                updatedAt,
                address,
                receiver,
                totalPrice,
                numberOfPhone,
                cartProducts
            }) => (
                <Box key={_id}>
                    <Stack direction="row"
                        sx={{
                            my: { xs: 0, md: 2 },
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    opacity: "0.5",
                                    fontSize: { xs: "0.4rem", md: "1rem" },
                                }}>Ngày đặt hàng</Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.4rem", md: "1rem" }
                                }}>{updatedAt}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    opacity: "0.5",
                                    fontSize: { xs: "0.4rem", md: "1rem" },
                                }}
                            >Địa chỉ</Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.4rem", md: "1rem" }
                                }}
                            >{address}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    opacity: "0.5",
                                    fontSize: { xs: "0.4rem", md: "1rem" },
                                }}
                            >Số điện thoại</Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.4rem", md: "1rem" }
                                }}
                            >{numberOfPhone}</Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    opacity: "0.5",
                                    fontSize: { xs: "0.4rem", md: "1rem" },
                                }}
                            >Người nhận</Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.4rem", md: "1rem" }
                                }}
                            >{receiver}</Typography>
                        </Box>
                    </Stack>

                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow sx={{
                                display: "flex",
                                width: "100%",
                                height: { xs: "35px", md: "45px" },
                            }}>
                                <TableCell
                                    sx={{
                                        fontSize: { xs: "0.4rem", md: "1rem" },
                                        width: { xs: "25%", md: "100%" },

                                    }}>Sản phẩm</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "0.4rem", md: "1rem" },
                                        width: { xs: "25%", md: "100%" }
                                    }}
                                >Tên</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "0.4rem", md: "1rem" },
                                        width: { xs: "25%", md: "100%" }
                                    }}
                                >Số lượng</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "0.4rem", md: "1rem" },
                                        width: { xs: "25%", md: "100%" }
                                    }}>Đơn giá</TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "0.4rem", md: "1rem" },
                                        width: { xs: "25%", md: "100%" }
                                    }}>Tổng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            {cartProducts.length > 0 && cartProducts.map(({ _id, name, price, quantity, imageUrl }) => (
                                <TableRow key={_id} sx={{
                                    display: "flex",
                                }}>
                                    <TableCell sx={{ width: { xs: "25%", md: "100%" } }}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",

                                        }} >
                                            <Box
                                                sx={{
                                                    borderRadius: 2,
                                                    width: { xs: "40px", md: "70px" },
                                                    height: { xs: "30px", md: "70px" },
                                                    overflow: { xs: "none", md: "hidden" },
                                                }}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt="product"
                                                    width="100%"
                                                    height="100%"

                                                />
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                        }}>
                                        <Typography sx={{ fontSize: { xs: "0.3rem", md: "1rem" } }}>{name}</Typography>
                                    </TableCell>
                                    <TableCell sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%"
                                    }} >
                                        <Typography sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: { xs: "6px", md: "1rem" }
                                        }}>
                                            {quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.3rem", md: "1rem" },
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%"
                                        }}
                                    >{fCurrency(price)}đ</TableCell>
                                    <TableCell
                                        sx={{
                                            fontSize: { xs: "0.3rem", md: "1rem" },
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                        }}
                                    >{fCurrency(price * quantity)}đ</TableCell>
                                </TableRow>
                            ))}
                            <TableRow
                                sx={{
                                    display: "flex",
                                    mb: 4
                                }}>
                                <TableCell sx={{ width: "100%" }} />
                                <TableCell sx={{ width: "100%" }} />
                                <TableCell sx={{ width: "100%" }} />
                                <TableCell
                                    sx={{
                                        color: "green",
                                        fontFamily: "bold",
                                        fontSize: { xs: "0.5rem", md: "1.2rem" }, width: { xs: "100%", md: "100%" },
                                    }}
                                >Tổng cộng:</TableCell>
                                <TableCell
                                    sx={{
                                        color: "green",
                                        fontFamily: "bold",
                                        fontSize: { xs: "0.5rem", md: "1.2rem" }, width: "100%",
                                    }}
                                >{fCurrency(totalPrice)}đ</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            ))
            }
            {orders.length > 0 && (
                <Pagination
                    sx={{ margin: 1 }}
                    component="div"
                    count={totalPage ? totalPage : 0}
                    page={page}
                    onChange={handleChangePage}
                />
            )}
        </Container >
    );
}

export default OrderForm;
