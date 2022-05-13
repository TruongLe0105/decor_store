import { Box, Menu, MenuItem, Stack, Typography, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { removeAccents } from "../utils/numberFormat";

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
        console.log("render", category)
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
            <Box sx={{ my: 1.5, px: 2.5 }}>
                {categories[0] && categories.map((category, index) => (
                    <MenuItem key={index} onClick={() => handleNavigateCategory(category)}>
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
            marginTop: "6%",
            // paddingTop: "2px",
            backgroundColor: "#eeeeee",
            height: "40px"
        }}>
            <Box sx={{
                display: "flex",
                margin: 2,
                padding: 1,
                fontSize: "16px"
            }}>
                <Link sx={{ cursor: "pointer", color: "#424242" }} onClick={() => navigate("/")}>TRANG CHỦ</Link>
                <span>/</span>
                <Typography sx={{ fontSize: "16px" }} color="#424242">DANH MỤC</Typography>
                <KeyboardArrowDownIcon
                    onClick={handleOpenMenuCategory}
                />
                <span>/</span>
                {categoriesMenu}
            </Box>
        </Stack>
    )
}

export default Collections;