import { Container, Typography } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function CheckoutCompletedPage() {
    return (
        <Container>
            <Typography sx={{ mt: 10, fontSize: { xs: "1rem", md: "1.5rem" } }}>Thank you for your purchase.</Typography>
            <FavoriteBorderIcon color="success" />
        </Container>
    );
}

export default CheckoutCompletedPage;
