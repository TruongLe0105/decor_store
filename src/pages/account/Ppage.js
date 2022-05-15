import React, { useState } from "react";
// import useAuth from "../hooks/useAuth";

import { Box, Card, Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// import Profile from "../features/user/Profile";
// import ProfileCover from "../features/user/ProfileCover";
// import AddFriend from "../features/friend/AddFriend";
// import FriendRequests from "../features/friend/FriendRequests";
// import FriendList from "../features/friend/FriendList";
import { capitalCase } from "change-case";
import useAuth from "../../hooks/useAuth";
import Profile from "../../features/user/Profile";
import Bank from "../../features/user/Bank";
import Address from "../../features/user/Address";
import UpdatePassword from "../../features/user/UpdatePassword";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
    zIndex: 9,
    // bottom: 0,
    top: "30%",
    left: 0,
    // position: "absolute",
    // margin: "20px",
    // marginTop: "10%",
    width: "15%",
    backgroundColor: "#fff",
    [theme.breakpoints.up("sm")]: {
        justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end",
        paddingRight: theme.spacing(3),
    },
}));

function Ppage() {
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
        <Stack sx={{
            margin: 4,
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#eeeeee" 
        }}>
            <Typography sx={{ textAlign: "center", mb: 2 }}>HỒ SƠ CỦA TÔI</Typography>
            <Box
                sx={{
                    display: "flex",
                    cursor: "pointer"
                }}
                onClick={() => setShowProfile(true)}
            >
                <AccountBoxIcon sx={{ fontSize: 24 }} />
                <Typography sx={{ fontSize: "1.1rem" }}>Thông tin tài khoản</Typography>
            </Box>
            {showProfile && (
                <Stack sx={{ display: "flex", flexDirection: "row" }}>

                    <TabsWrapperStyle>
                        <Tabs
                            orientation="vertical"
                            value={currentTab}
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            onChange={(e, value) => handleChangeTab(value)}
                            sx={{ display: "flex", alignItems: "flex-start", marginLeft: 3 }}
                        >
                            {PROFILE_TABS.map((tab) => (
                                <Tab
                                    sx={{ display: "flex", alignItems: "flex-start" }}
                                    disableRipple
                                    key={tab.value}
                                    value={tab.value}
                                    icon={tab.icon}
                                    // label={capitalCase(tab.value)}
                                    label={tab.value}
                                />
                            ))}
                        </Tabs>
                    </TabsWrapperStyle>
                    <Stack sx={{ margin: 2 }}>
                        {
                            PROFILE_TABS.map((tab) => {
                                const isMatched = tab.value === currentTab;
                                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                            })
                        }
                    </Stack>
                </Stack>
            )}
        </Stack >
    );
}

export default Ppage;
