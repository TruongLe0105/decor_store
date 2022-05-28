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
        <Stack>
            <Box
                sx={{
                    mt: { xs: 1, sm: 3 },
                    display: "flex",
                    bgcolor: "#212121",
                    flexDirection: { sm: "row", xs: "column" },
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
                            fontSize: { xs: "0.5rem", sm: "0.9rem", md: "1.1rem" }
                        }}
                    >GIỚI THIỆU</Typography>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <HomeOutlinedIcon sx={{ fontSize: { xs: "0.5rem", sm: "1.1rem", md: "1.4rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                            }}
                        >44 Lê Lợi, Q.Thủ Đức, TPHCM</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <EmailOutlinedIcon sx={{ fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.4rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                            }}
                        >hello@titus.com</Typography>
                    </Box>
                    <Box
                        sx={{ display: "flex" }}
                    >
                        <LocalPhoneOutlinedIcon sx={{ fontSize: { xs: "0.8rem", sm: "1.4rem" } }} />
                        <Typography
                            sx={{
                                fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                            }}
                        >0522729563</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: "white",
                            mb: { xs: 1, sm: 2 },
                            fontSize: { xs: "0.5rem", sm: "0.9rem", md: "1.1rem" }
                        }}
                    >LIÊN KẾT</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                        }}
                    >Giới thiệu</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                        }}
                    >Hướng dẫn mua hàng</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                        }}
                    >Chính sách bảo hành</Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
                        }}
                    >Chính sách bảo mật</Typography>
                </Box>
                <Box sx={{
                    color: "#9e9e9e",
                    ml: { xs: 1, md: 0 }
                }}>
                    <Typography
                        sx={{
                            color: "white",
                            mb: { xs: 1, sm: 2 },
                            fontSize: { xs: "0.5rem", sm: "0.9rem", md: "1.1rem" }
                        }}
                    >ĐĂNG KÍ NHẬN TIN</Typography>
                    <TextField
                        sx={{
                            height: { xs: "1.5rem", sm: "2rem" }
                        }} />
                    <Typography
                        sx={{
                            fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" }
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
                            fontSize: { xs: "0.5rem", sm: "0.9rem", md: "1.1rem" }
                        }}
                    >ĐỐI TÁC BÁN HÀNG:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: { xs: "50%", md: "100%" }
                        }}
                    >
                        <img
                            src={shopee}
                            alt="shopee"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", sm: "block" }
                            }}
                        />
                        <img
                            src={lazada}
                            alt="lazada"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", sm: "block" }
                            }}
                        />
                        <img
                            src={tiki}
                            alt="tiki"
                            width="60px"
                            height="60px"
                            sx={{
                                display: { xs: "none", sm: "block" }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Stack >
    );
};

export default MainFooter;