import React, { useState } from "react";

import { Box, Card, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/ProfileForm";
import AddressForm from "../../features/user/AddressForm";
import UpdatePassword from "../../features/user/PasswordForm";
import SummarizeIcon from '@mui/icons-material/Summarize';
import PurchaseForm from "../../components/customers/orders/PurchaseForm";
import Collections from "../../components/collections/Collections";

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
        <>
            <Collections status="prevent" />
            <Stack sx={{
                height: "100%"
            }}>
                <Grid container
                    sx={{
                        marginTop: { xs: 11, sm: 15 },
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 2,
                    }}
                >

                    <Grid item xs={12} sm={3} md={2}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "row", sm: "column" },
                            justifyContent: "space-between"
                        }}

                        >
                            <Box
                                onClick={() => setSelectedProfile("Thông tin tài khoản")}
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "row",
                                    my: { xs: 0, sm: 1 },
                                    px: { xs: 1, sm: 0, md: 1 },
                                }}>
                                <AccountBoxIcon
                                    sx={{
                                        fontSize: { xs: 20, sm: 22 },
                                        color: "#008e97"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.1rem" }
                                    }}
                                >Thông tin tài khoản</Typography>
                            </Box>
                            <Box
                                onClick={() => setSelectedProfile("Đơn hàng của tôi")}
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "row",
                                    px: { xs: 1, sm: 0, md: 1 },
                                    my: { xs: 0, sm: 1 }
                                }}>
                                <SummarizeIcon
                                    sx={{
                                        fontSize: { xs: 20, sm: 22 },
                                        color: "#008e97"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.1rem" }
                                    }}
                                >Đơn hàng của tôi</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9} sm={8}>
                        {selectedProfile === "Thông tin tài khoản" && (
                            <Card sx={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}>
                                <Tabs
                                    value={currentTab}
                                    allowScrollButtonsMobile
                                    onChange={(e, value) => handleChangeTab(value)}
                                >
                                    {PROFILE_TABS.map((tab) => (
                                        <Tab
                                            sx={{
                                                fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" },
                                            }}
                                            key={tab.value}
                                            value={tab.value}
                                            label={tab.value}
                                        />
                                    ))}
                                </Tabs>
                            </Card >
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
        </>
    );
}

export default ProfilePage;
