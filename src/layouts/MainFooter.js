import { Box, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import shopee from "./image/shopee.png";
import lazada from "./image/lazada.png";
import tiki from "./image/tiki.jpg";

function MainFooter() {
    return (
        <Stack sx={{
            mt: 2,
            zIndex: 1000,
        }}>
            <Box
                sx={{
                    display: "flex",
                    bgcolor: "#212121",
                    flexDirection: { md: "row", xs: "column" },
                    justifyContent: "space-between",
                    padding: { md: 2, xs: 1 },
                    color: "#9e9e9e",
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            color: "white",
                            mb: { xs: 1, md: 2 },
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >GIỚI THIỆU</Typography>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <HomeOutlinedIcon sx={{ fontSize: { xs: "0.8rem", md: "1.6rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.6rem", md: "1.2rem" }
                            }}
                        >44 Lê Lợi, Q.Thủ Đức, TPHCM</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <EmailOutlinedIcon sx={{ fontSize: { xs: "0.8rem", md: "1.6rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.6rem", md: "1.2rem" }
                            }}
                        >hello@titus.com</Typography>
                    </Box>
                    <Box
                        sx={{ display: "flex" }}
                    >
                        <LocalPhoneOutlinedIcon sx={{ fontSize: { xs: "0.8rem", md: "1.6rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.6rem", md: "1.2rem" }
                            }}
                        >0522729563</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: "white",
                            mb: { xs: 1, md: 2 },
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >LIÊN KẾT</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >Giới thiệu</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >Hướng dẫn mua hàng</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >Chính sách bảo hành</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >Chính sách bảo mật</Typography>
                </Box>
                <Box sx={{
                    color: "#9e9e9e"
                }}>
                    <Typography
                        sx={{
                            color: "white",
                            mb: { xs: 1, md: 2 },
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >ĐĂNG KÍ NHẬN TIN</Typography>
                    <TextField
                        sx={{
                            height: { xs: "1.5rem", md: "3rem" }
                        }} />
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >Hãy nhập email của bạn vào đây để nhận tin!</Typography>
                </Box>
                <Box sx={{
                    color: "#9e9e9e"
                }}>
                    <Typography
                        sx={{
                            color: "white",
                            mb: 2,
                            fontSize: { xs: "0.6rem", md: "1.2rem" }
                        }}
                    >ĐỐI TÁC BÁN HÀNG:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <img
                            src={shopee}
                            alt="shopee"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", md: "block" }
                            }}
                        />
                        <img
                            src={lazada}
                            alt="lazada"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", md: "block" }
                            }}
                        />
                        <img
                            src={tiki}
                            alt="tiki"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", md: "block" }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
};

export default MainFooter;