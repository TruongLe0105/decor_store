import { Stack, Typography, Button, Box, Card } from '@mui/material';
import React, { useEffect } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DialogNewAddress from '../../components/DialogNewAddress';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from './userSlice';
import DialogUpdateAddress from '../../components/DialogUpdateAddress';
import DeleteAddress from '../../components/DeleteAddress';

function AddressForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    useEffect(() => {
        dispatch(getCurrentUserProfile())
    }, [dispatch]);

    return (
        <Stack >
            <Typography sx={{
                fontSize: "1.5rem",
                textAlign: "center",
                margin: 1
            }}>Địa Chỉ Của Tôi</Typography>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Button sx={{
                    textAlign: "right",
                    margin: 2
                }}>
                    <AddRoundedIcon />
                    <DialogNewAddress />
                </Button>
                {currentUser && currentUser.orderAddress.map(({ _id, address, numberOfPhone, receiver }) => (
                    <Card key={_id} sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 1,
                        paddingLeft: "10%",
                        paddingRight: "10%",
                        borderRadius: 0
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                        }}>
                            <Box sx={{
                                display: "flex",
                            }}>
                                <Typography sx={{
                                    opacity: 0.8,
                                    fontSize: "0.8rem",
                                    marginRight: 8,
                                    marginBottom: 2
                                }}>Họ Và Tên</Typography>
                                <Typography sx={{ fontSize: "0.9rem" }}>{receiver}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                            }}>
                                <Typography sx={{
                                    opacity: 0.8,
                                    fontSize: "0.8rem",
                                    marginRight: 5,
                                    marginBottom: 2
                                }}>Số Điện Thoại</Typography>
                                <Typography sx={{ fontSize: "0.9rem" }}>{numberOfPhone}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                            }}>
                                <Typography sx={{
                                    opacity: 0.8,
                                    fontSize: "0.8rem",
                                    marginRight: 11,
                                    marginBottom: 2
                                }}>Địa Chỉ</Typography>
                                <Typography sx={{ fontSize: "0.9rem" }}>{address}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 2,
                            }}>
                                <DialogUpdateAddress
                                    addressId={_id}
                                    address={address}
                                    numberOfPhone={numberOfPhone}
                                    receiver={receiver}
                                />
                                <DeleteAddress addressId={_id} />
                            </Box>
                            {/* <Button sx={{
                                fontSize: "0.8rem",
                            }}>Mặc Định</Button> */}
                        </Box>

                    </Card>
                ))}
            </Card>
        </Stack >
    )
};

export default AddressForm;