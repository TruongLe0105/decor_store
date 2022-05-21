import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

function BlankLayout() {
    return (
        <>
            <Stack sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Container sx={{ display: "flex" }}>
                    <Logo />
                    <Typography sx={{ color: "#0097a7", fontSize: "2rem " }}>
                        Titus
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", margin: 1.5 }}>
                        Decor
                    </Typography>
                </Container>
                <Outlet />
            </Stack>
        </>
    );
}

export default BlankLayout;