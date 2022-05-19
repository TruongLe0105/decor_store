import React, { useState } from "react";

import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/ProfileForm";
import AddressForm from "../../features/user/AddressForm";
import UpdatePassword from "../../features/user/PasswordForm";

function ProfilePage() {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState("Hồ sơ");
    const [showProfile, setShowProfile] = useState(true);


    const handleChangeTab = (newValue) => {
        setCurrentTab(newValue);
    };

    const PROFILE_TABS = [
        {
            value: "Hồ sơ",
            component: <Profile profile={user} />,
        },
        {
            value: "Địa chỉ",
            component: <AddressForm />,
        },
        {
            value: "Đổi mật khẩu",
            component: <UpdatePassword />,
        },
    ];

    return (
        <Stack sx={{ backgroundColor: "#f5f5f5", height: "100%" }}>
            <Grid container
                sx={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "flex-start",
                }}
            >

                <Grid item xs={12} md={2}>
                    <Box sx={{
                        cursor: "pointer",
                        display: "flex",
                    }}
                        onClick={() => setShowProfile(true)}
                    >
                        <AccountBoxIcon sx={{ fontSize: { xs: 18, md: 24 } }} />
                        <Typography sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}>Thông tin tài khoản</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}    >
                    {showProfile && (
                        <Box sx={{
                            mt: 3
                        }}>
                            <Tabs
                                value={currentTab}
                                variant="scrollable"
                                allowScrollButtonsMobile
                                onChange={(e, value) => handleChangeTab(value)}
                                sx={{

                                    bgcolor: "#f5f5f5",
                                    width: "100%",
                                    orientation: { xs: "vertical", md: "vertical" }
                                }}
                            >
                                {PROFILE_TABS.map((tab) => (
                                    <Tab
                                        sx={{
                                            display: "flex",
                                            fontSize: { xs: "0.6rem", md: "0.8rem" }
                                        }}
                                        disableRipple
                                        key={tab.value}
                                        value={tab.value}
                                        label={tab.value}
                                    />
                                ))}
                            </Tabs>
                        </Box >
                    )}
                    {
                        PROFILE_TABS.map((tab) => {
                            const isMatched = tab.value === currentTab;
                            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                        })
                    }
                </Grid>
            </Grid>
        </Stack >
    );
}

export default ProfilePage;
