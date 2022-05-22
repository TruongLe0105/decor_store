import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AlertMsg from '../components/AlertMsg';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

function MainLayout() {
    return (
        <Stack sx={{ minHeight: "100vh", maxWidth: "100%", bgcolor: "#f5f5f5" }}>
            <MainHeader />
            <AlertMsg />
            <Outlet />
            <MainFooter />
        </Stack>
    );
};

export default MainLayout;