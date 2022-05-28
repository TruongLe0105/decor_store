import { Box, Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AlertMsg from '../components/AlertMsg';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

function MainLayout() {
    return (
        <Stack
            sx={{
                height: "100%",
                minHeight: "100vh",
                backgroundColor: "#fafafa",
            }}
        >
            <MainHeader />
            <AlertMsg />
            <Outlet />
            <Box sx={{ flexGrow: 1 }} />
            <MainFooter />
        </Stack>
    );
};

export default MainLayout;