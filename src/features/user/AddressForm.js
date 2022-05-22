import { Stack, Typography, Button, Box, Card } from '@mui/material';
import React, { useEffect } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getCurrentUserProfile } from './userSlice';
import DialogNewAddress from '../../components/customers/address/DialogNewAddress';
import DialogUpdateAddress from '../../components/customers/address/DialogUpdateAddress';
import DeleteAddress from '../../components/customers/address/DeleteAddress';


function AddressForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser, shallowEqual);
    useEffect(() => {
        dispatch(getCurrentUserProfile())
    }, [dispatch]);

    return (
        <Stack>
            <Typography sx={{
                fontSize: { xs: "0.9rem", md: "1.4rem" },
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
                                    fontSize: { xs: "0.6rem", md: "0.8rem" },
                                    marginRight: 8,
                                    marginBottom: 2
                                }}>Họ Và Tên</Typography>
                                <Typography sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>{receiver}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                            }}>
                                <Typography sx={{
                                    opacity: 0.8,
                                    fontSize: { xs: "0.6rem", md: "0.8rem" },
                                    marginRight: 5,
                                    marginBottom: 2
                                }}>Số Điện Thoại</Typography>
                                <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" } }}>{numberOfPhone}</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                            }}>
                                <Typography sx={{
                                    opacity: 0.8,
                                    fontSize: { xs: "0.6rem", md: "0.8rem" },
                                    marginRight: 11,
                                    marginBottom: 2
                                }}>Địa Chỉ</Typography>
                                <Typography sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>{address}</Typography>
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
                        </Box>

                    </Card>
                ))}
            </Card>
        </Stack >
    )
};

export default AddressForm;