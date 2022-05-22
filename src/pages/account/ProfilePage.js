import React, { useState } from "react";

import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/ProfileForm";
import AddressForm from "../../features/user/AddressForm";
import UpdatePassword from "../../features/user/PasswordForm";
import SummarizeIcon from '@mui/icons-material/Summarize';
import PurchaseForm from "../../components/customers/PurchaseForm";

function ProfilePage() {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState("Hồ sơ");
    const [selectedProfile, setSelectedProfile] = useState("Thông tin tài khoản");

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
        <Stack sx={{
            backgroundColor: "#f5f5f5",
            height: "100%"
        }}>
            <Grid container
                sx={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 2
                }}
            >

                <Grid item xs={12} md={2}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "row", md: "column" },
                        justifyContent: "space-between"
                    }}

                    >
                        <Box
                            onClick={() => setSelectedProfile("Thông tin tài khoản")}
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                mt: 3
                            }}>
                            <AccountBoxIcon sx={{ fontSize: { xs: 18, md: 24 }, color: "#008e97" }} />
                            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}>Thông tin tài khoản</Typography>
                        </Box>
                        <Box
                            onClick={() => setSelectedProfile("Đơn hàng của tôi")}
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                mt: 3
                            }}>
                            <SummarizeIcon sx={{ fontSize: { xs: 18, md: 24 }, color: "#008e97" }} />
                            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}>Đơn hàng của tôi</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9} sx={{
                    backgroundColor: "white",
                }} >
                    {selectedProfile === "Thông tin tài khoản" && (
                        <Box>
                            <Tabs
                                value={currentTab}
                                allowScrollButtonsMobile
                                onChange={(e, value) => handleChangeTab(value)}
                            >
                                {PROFILE_TABS.map((tab) => (
                                    <Tab
                                        sx={{
                                            display: "flex",
                                            fontSize: { xs: "0.6rem", md: "0.8rem" },
                                        }}
                                        key={tab.value}
                                        value={tab.value}
                                        label={tab.value}
                                    />
                                ))}
                            </Tabs>
                        </Box >
                    )}
                    {selectedProfile === "Thông tin tài khoản" &&
                        PROFILE_TABS.map((tab) => {
                            const isMatched = tab.value === currentTab;
                            return isMatched && <Box sx={{
                                margin: 1,
                            }} key={tab.value}>{tab.component}</Box>;
                        })
                    }
                    {selectedProfile === "Đơn hàng của tôi" && <PurchaseForm />}
                </Grid>
            </Grid>
        </Stack >
    );
}

export default ProfilePage;
