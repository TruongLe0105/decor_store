import { Container, Divider, Menu, MenuItem, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Profile from '../../features/user/Profile';
import Bank from '../../features/user/Bank';
import Address from '../../features/user/Address';
import UpdatePassword from '../../features/user/UpdatePassword';


function ProfilePage() {
    const { user, logout } = useAuth();
    const [showProfile, setShowProfile] = useState(false)
    // const [currentTab, setCurrentTab] = useState("Hồ")
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
    // const handleChangeTab = (newValue) => {
    //     setCurrentTab(newValue);
    // }

    // const PROFILE_TAB = [
    //     {
    //         value: "Hồ sơ",
    //         // value: "profile",
    //         component: <Profile />
    //     },
    //     {
    //         value: "Ngân hàng",
    //         component: <Bank />
    //     },
    //     {
    //         value: "Địa chỉ",
    //         component: <Address />
    //     },
    //     {
    //         value: "Đổi mật khẩu",
    //         component: <UpdatePassword />
    //     },
    // ]

    return (
        <Stack sx={{ mt: "10px  " }}>
            <Typography sx={{ textAlign: "center", mb: 2 }}>TÀI KHOẢN CỦA TÔI</Typography>
            <Container>
                <Box
                    sx={{ display: "flex" }}
                    onClick={() => setShowProfile(true)}
                >
                    <PersonOutlineIcon />
                    <Typography sx={{ fontSize: "1.1rem" }}>Thông tin tài khoản</Typography>
                </Box>
                {showProfile && (
                    <div style={{
                        paddingLeft: "5%",
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Box>Hồ sơ</Box>
                        <Box>Ngân hàng</Box>
                        <Box>Địa chỉ</Box>
                        <Box>Đổi mật khẩu</Box>
                    </div>
                )}
                <Box sx={{ display: "flex" }}>
                    <LogoutIcon />
                    <Typography sx={{ cursor: "pointer" }} onClick={handleLogout}>Đăng xuất</Typography>
                </Box>
            </Container>
        </Stack>
    )
};

export default ProfilePage;


