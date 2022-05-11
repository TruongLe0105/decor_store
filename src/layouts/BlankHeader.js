import { Container, Typography } from '@mui/material'
import React from 'react'
import Logo from '../components/Logo'

function BlankHeader() {
    return (
        <Container sx={{
            display: "flex",
            marginLeft: "4rem"
        }}>
            <Logo />
            <Typography sx={{ color: "#0097a7", fontSize: "30px", marginLeft: 1 }}>
                Titus
            </Typography>

        </Container>
    )
}

export default BlankHeader