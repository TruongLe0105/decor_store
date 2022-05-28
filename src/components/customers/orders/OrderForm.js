import {
    Box,
    Card,
    Divider,
    Typography,
} from "@mui/material";
import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreIcon from '@mui/icons-material/Store';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

import { getListOrder, resetOrderId } from "../../../features/user/order/orderSlice";
import { fDateTimeSuffix } from "../../../utils/formatTime";
import { fCurrency } from "../../../utils/numberFormat";
import DialogUpdateStatus from "./DialogUpdateStatus";

function OrderForm({ status, text, icon, contentBtn }) {
    const dispatch = useDispatch();
    let { orders, orderId } = useSelector(state => state.order);
    orders = orders?.filter(e => e._id !== orderId);

    useEffect(() => {
        dispatch(getListOrder({ status }));
        dispatch(resetOrderId());
    }, [dispatch, status]);

    return (
        <>
            {orders?.length > 0 && orders?.map(({
                _id,
                updatedAt,
                address,
                receiver,
                totalPrice,
                numberOfPhone,
                cartProducts
            }) => (
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 2,
                        margin: 1
                    }}
                    key={_id}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <StoreIcon
                                sx={{
                                    color: "#4db6ac",
                                    mr: 1,
                                    fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" }
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" },
                                    fontWeight: "600"
                                }}
                            >TitusStore</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                color: "#4db6ac",
                            }}
                        >
                            {icon}
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                }}
                            >
                                {text}
                            </Typography>
                        </Box>
                    </Box>
                    {cartProducts?.map(({ _id, name, categories, price, quantity, imageUrl }) => (
                        <Box
                            key={_id}
                            direction="row"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Divider sx={{ margin: 1 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: "50px", sm: "80px" },
                                            height: { xs: "50px", sm: "80px" },
                                            overflow: "hidden",
                                            borderRadius: 1,
                                            mr: 1
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={categories}
                                            width="100%"
                                            height="100%"
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                            }}
                                        >{name}</Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                            }}
                                        >x{quantity}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    color: "#4db6ac",
                                    fontSize: { xs: "0.6rem", sm: "0.8rem" },
                                    mr: 5
                                }}>
                                    {fCurrency(price)}đ
                                </Box>
                            </Box>
                        </Box>
                    ))}
                    <Divider sx={{ margin: 1 }} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                    fontFamily: "cursive",
                                    opacity: "0.6"
                                }}
                            >{fDateTimeSuffix(updatedAt)}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    mt: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                        mr: 1
                                    }}
                                >{receiver.toUpperCase()}</Typography>
                                <Typography
                                    sx={{
                                        opacity: "0.6",
                                        fontFamily: "cursive",
                                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                    }}
                                >{numberOfPhone}</Typography>
                            </Box>
                            <Typography
                                sx={{
                                    opacity: "0.6",
                                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                }}
                            >{address}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <InventoryOutlinedIcon
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                                        color: "#4db6ac",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        mr: 1,
                                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                                    }}
                                >Tổng tiền:</Typography>
                                <Typography
                                    sx={{
                                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" },
                                        color: "#4db6ac"
                                    }}
                                >{fCurrency(totalPrice)}đ</Typography>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: "right",
                                    mt: 2,
                                }}>
                                {status === "pending" && <DialogUpdateStatus
                                    orderId={_id}
                                    newStatus="declined"
                                    content={contentBtn}
                                />}
                                {status === "shipping" && <DialogUpdateStatus
                                    orderId={_id}
                                    newStatus="completed"
                                    content={contentBtn}
                                />}
                                {status === "completed" && <DialogUpdateStatus
                                    orderId={_id}
                                    newStatus="buyAgain"
                                    content={contentBtn}
                                />}
                                {status === "declined" && <DialogUpdateStatus
                                    orderId={_id}
                                    newStatus="buyAgain"
                                    content={contentBtn}
                                />}
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ))}
            {orders?.length === 0 && (
                <Card
                    sx={{
                        margin: 1,
                        height: { xs: "200px", md: "400px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <InventoryOutlinedIcon
                        sx={{
                            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                            color: "#4db6ac",
                        }}
                    />
                    <Typography
                        sx={{
                            mr: 1,
                            fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1.3rem" },
                        }}
                    >Chưa có đơn hàng</Typography>
                </Card>
            )}
        </>
    );
}

export default OrderForm;

