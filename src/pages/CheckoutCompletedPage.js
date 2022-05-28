import { Box, Container, Typography } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useNavigate } from "react-router-dom";

function CheckoutCompletedPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                    color: "#008e97"
                }}
            >
                <Typography sx={{ fontSize: { xs: "1rem", sm: "2.5rem" } }}>Thank you for your purchase.</Typography>
                <FavoriteBorderIcon color="success" />
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: { xs: "0.8rem", sm: "1.5rem" },
                        textAlign: "center"
                    }}
                >Nhấn vào <WidgetsIcon
                        sx={{
                            color: "#008e97",
                            fontSize: { xs: "1.2rem", sm: "2rem" },
                        }}
                        onClick={() => navigate("/user/account/profile")}
                    /> để kiểm tra đơn hàng của bạn</Typography>
                {/* <Button>

                </Button> */}
            </Box>
        </Container>
    );
}

export default CheckoutCompletedPage;
