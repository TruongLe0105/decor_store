import React, { useState } from "react";

import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// import { capitalCase } from "change-case";
import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/ProfileForm";
import Bank from "../../features/user/Bank";
import Address from "../../features/user/Address";
import UpdatePassword from "../../features/user/PasswordForm";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
    // zIndex: 9,
    // width: "15%",
    // backgroundColor: "#fff",
    // [theme.breakpoints.up("xs")]: {
    //     display: "flex",
    //     justifyContent: "center",
    // },
    // [theme.breakpoints.up("md")]: {
    //     justifyContent: "flex-start",
    //     paddingRight: theme.spacing(1),
    // },
}));

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
            value: "Ngân hàng",
            component: <Bank />,
        },
        {
            value: "Địa chỉ",
            component: <Address />,
        },
        {
            value: "Đổi mật khẩu",
            component: <UpdatePassword />,
        },
    ];

    return (
        <Stack sx={{ backgroundColor: "#fafafa", height: "100vh" }}>
            <Grid container spacing={2}
                sx={{
                    // display: "flex",
                    marginTop: 10,
                }}
            >
                <Grid item xs={12} md={2}
                    sx={{
                        marginLeft: 2,
                        backgroundColor: "#fafafa"
                    }}
                >
                    <Box sx={{
                        cursor: "pointer",
                        display: "flex",
                    }}
                        onClick={() => setShowProfile(true)}
                    >
                        <AccountBoxIcon sx={{ fontSize: 24 }} />
                        <Typography sx={{ fontSize: "1.1rem" }}>Thông tin tài khoản</Typography>
                    </Box>

                    {showProfile && (
                        <TabsWrapperStyle>
                            <Tabs
                                orientation="vertical"
                                // orientation="horizontal"
                                value={currentTab}
                                scrollButtons="auto"
                                variant="scrollable"
                                allowScrollButtonsMobile
                                onChange={(e, value) => handleChangeTab(value)}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    marginLeft: 4,
                                }}
                            >
                                {PROFILE_TABS.map((tab) => (
                                    <Tab
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            fontSize: "0.8rem"
                                        }}
                                        disableRipple
                                        key={tab.value}
                                        value={tab.value}
                                        icon={tab.icon}
                                        label={tab.value}
                                    />
                                ))}
                            </Tabs>
                        </TabsWrapperStyle>
                    )}
                </Grid>
                <Grid item xs={12} md={9}>
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
