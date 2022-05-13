import { Container, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';


function ProfilePage() {
    const { user, logout } = useAuth();
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(() => {
                navigate("/login")
            });
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Stack sx={{ mt: "13%" }}>
            <Typography sx={{ textAlign: "center", mb: 2 }}>TÀI KHOẢN CỦA TÔI</Typography>
            <Container sx={{ display: "flex" }}>
                <Box >
                    <Box
                        sx={{ display: "flex" }}
                        onClick={() => setShowProfile(true)}
                    >
                        <PersonOutlineIcon />
                        <Typography sx={{ fontSize: "1.1rem" }}>Thông tin tài khoản</Typography>
                    </Box>
                    {showProfile && (
                        <div style={{ paddingLeft: "20%" }}>
                            <Typography>Hồ sơ</Typography>
                            <Typography>Ngân hàng</Typography>
                            <Typography>Địa chỉ</Typography>
                            <Typography>Đổi mật khẩu</Typography>
                        </div>
                    )}
                    <Box sx={{ display: "flex" }}>
                        <LogoutIcon />
                        <Typography onClick={handleLogout}>Đăng xuất</Typography>
                    </Box>
                </Box>
                <Box>

                </Box>
            </Container>
        </Stack>
    )
};

export default ProfilePage;