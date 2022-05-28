import { Box, Card, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react';

import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CallIcon from '@mui/icons-material/Call';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

function AddressOrder({ receiver, numberOfPhone, address }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ContactMailOutlinedIcon sx={{
                color: "green",
                fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" },
            }}
                onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <Card
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                margin: 2
                            }}
                        >
                            <ContactPageIcon
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.4rem" },
                                    color: "green"
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                    fontFamily: "bold"
                                }}
                            >
                                Customers
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                margin: 2
                            }}
                        >
                            <CallIcon
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.4rem" },
                                    color: "green"
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                    fontFamily: "bold"
                                }}
                            >
                                Phone
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                margin: 2
                            }}
                        >
                            <AddLocationAltIcon
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.4rem" },
                                    color: "green"
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: { md: "1.3rem", sm: "1.1rem", xs: "0.8rem" },
                                    fontFamily: "bold"
                                }}
                            >
                                Address
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.7rem" },
                                margin: 2,
                                fontFamily: "bold"
                            }}
                        >
                            {(receiver).toUpperCase()}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.7rem" },
                                margin: 2,
                                opacity: 0.7
                            }}
                        >
                            {numberOfPhone}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.7rem" },
                                margin: 2,
                                opacity: 0.7
                            }}
                        >
                            {address}
                        </Typography>
                    </Box>
                </Card>
            </Dialog>
        </>
    )
};

export default AddressOrder;