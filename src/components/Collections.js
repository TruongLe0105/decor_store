import { Box, Menu, MenuItem, Stack, Typography, Link } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import CartWidget from './CartWidget';
import SortMenu from './collections/SortMenu';

function Collections({ collection }) {
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
                    <MenuItem key={index} sx={{ fontSize: { xs: "0.6rem", md: "1.1rem" } }} onClick={() => handleNavigateCategory(category)}>
                        {category}
                    </MenuItem>
                ))}
            </Box>
        </Menu>
    )

    return (
        <Stack
            sx={{
                position: "fixed",
                zIndex: 1000,
                alignItems: "center",
                marginTop: { xs: "50px", md: "63px" },
                mb: 1,
                backgroundColor: "#fafafa",
                width: "100%",
                height: { xs: "30px", md: "40px" },
            }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 2,
                }}>
                    <Link
                        sx={{
                            fontSize: { xs: "0.8rem", md: "1.5rem" },
                            cursor: "pointer",
                        }}
                        underline="none"
                        onClick={() => navigate("/")}>Trang Chủ</Link>
                    <span>/</span>
                    <Typography
                        onClick={handleOpenMenuCategory}
                        sx={{
                            fontSize: { xs: "0.7rem", md: "1.3rem" },
                            cursor: "pointer"
                        }}
                    >Danh Mục</Typography>
                    <KeyboardArrowDownIcon
                        sx={{
                            fontSize: { xs: "16px", md: "20px" }
                        }}
                    />
                    <span>/</span>
                    {categoriesMenu}
                    <Typography
                        sx={{
                            fontSize: { xs: "0.6rem", md: "1.2rem" },
                        }}
                    >{collection}</Typography>
                </Box>
                <CartWidget />
                <SortMenu />
            </Box>
        </Stack >
    )
}

export default Collections;