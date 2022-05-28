import { Box, Menu, MenuItem, Stack, Typography, Link, Breadcrumbs } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useParams } from 'react-router-dom';
import CartWidget from '../customers/cart/CartWidget';
import SortMenu from './SortMenu';

function Collections({ collection, status }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.id)
    const categories = ["Mô hình trang trí", "Cây cảnh", "Khung tranh treo tường"]

    const handleMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleOpenMenuCategory = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleNavigateCategory(category) {
        const categoryId = category.split(" ").join('-');
        handleMenuClose();
        navigate(`/products/categories/${categoryId}`);
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
                    <MenuItem key={index} sx={{ fontSize: { xs: "0.6rem", sm: "1.1rem" } }} onClick={() => handleNavigateCategory(category)}>
                        {category}
                    </MenuItem>
                ))}
            </Box>
        </Menu>
    )

    return (
        < Stack
            sx={{
                position: "fixed",
                zIndex: 1000,
                alignItems: "center",
                marginTop: { xs: "50px", sm: "63px" },
                mb: 1,
                backgroundColor: "#fafafa",
                width: "100%",
                height: { xs: "35px", sm: "45px" },
            }
            }>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                }}>
                <Breadcrumbs
                    separator="|"
                    sx={{
                        pl: { sm: 6, xs: 3 },
                        pt: { xs: "5px", sm: 0 },
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Link
                        sx={{
                            fontSize: { xs: "0.8rem", sm: "1.3rem", md: "1.5rem" },
                            cursor: "pointer",
                        }}
                        underline="none"
                        onClick={() => navigate("/")}>Trang Chủ</Link>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Typography
                            onClick={handleOpenMenuCategory}
                            sx={{
                                fontSize: { xs: "0.7rem", sm: "1.1rem", md: "1.3rem" },
                                cursor: "pointer"
                            }}
                        >Danh Mục</Typography>
                        <KeyboardArrowDownIcon
                            sx={{
                                fontSize: { xs: "16px", sm: "20px" }
                            }}
                        />
                    </Box>
                    {collection && (
                        <Typography
                            sx={{
                                fontSize: { xs: "0.5rem", sm: "1.1rem", md: "1.2rem" },
                            }}
                        >{collection}</Typography>
                    )}
                </Breadcrumbs>
                {categoriesMenu}
                <Box sx={{
                    display: "flex"
                }}>
                    <CartWidget />
                    {status !== "prevent" && <SortMenu />}
                </Box>
            </Box>
        </Stack >
    )
}

export default Collections;