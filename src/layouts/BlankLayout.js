import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import BlankHeader from './BlankHeader';
import MainFooter from './MainFooter';

function BlankLayout() {
    return (
        <>
            <BlankHeader />
            <Stack
                sx={{
                    minHeight: "100vh",
                    // width: "100%",
                    padding: 0
                }}
            >

                <Outlet />
            </Stack>
            <MainFooter />
        </>
    );
}

export default BlankLayout;