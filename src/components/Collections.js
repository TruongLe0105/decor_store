import { Box, Menu, MenuItem, Stack, Typography, Link } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import CartWidget from './CartWidget';

function Collections() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const categories = ["Mô hình trang trí", "Cây cảnh", "Khung tranh treo tường"]

    const handleMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleOpenMenuCategory = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleNavigateCategory(category) {
        handleMenuClose();
        navigate(`/products/categories/${category.split(" ").join('-')}`);
    };
    const categoriesMenu = (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={handleMenuOpen}
            onClose={handleMenuClose}
        >
            <Box >
                {categories.length && categories.map((category, index) => (
                    <MenuItem sx={{ fontSize: { xs: "0.6rem", md: "1.1rem" } }} key={index} onClick={() => handleNavigateCategory(category)}>
                        {category}
                    </MenuItem>
                ))}
            </Box>
        </Menu>
    )

    return (
        <Stack sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: { xs: "50px", md: "60px" },
            backgroundColor: "#fafafa",
            height: "40px"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: 2,
            }}>
                <Link sx={{
                    fontSize: { xs: "0.7rem", md: "1.3rem" },
                    cursor: "pointer",
                    color: "#424242"
                }}
                    underline="none"
                    onClick={() => navigate("/")}>TRANG CHỦ</Link>
                <span>/</span>
                <Typography sx={{ fontSize: { xs: "0.6rem", md: "1.2rem" }, }} color="#424242">DANH MỤC</Typography>
                <KeyboardArrowDownIcon sx={{ fontSize: { xs: "16px", md: "20px" } }}
                    onClick={handleOpenMenuCategory}
                />
                <span>/</span>
                {categoriesMenu}
            </Box>
            <CartWidget />
        </Stack >
    )
}

export default Collections;