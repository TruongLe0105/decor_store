import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Menu, Link, Avatar, Divider } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logoImg from "../logo.png";
import avtImg from "../myavt.jpg"
import useAuth from '../hooks/useAuth';

function MainHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    console.log(user)

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            handleMenuClose();
            await logout(() => {
                navigate("/login")
            });
        } catch (error) {
            console.error(error)
        }
    };

    const renderMenu = (
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
                horizontal: 'right',
            }}
            open={handleMenuOpen}
            onClose={handleMenuClose}
        >
            <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography>
                    {user.name}
                </Typography>
                <Typography>
                    {user.email}
                </Typography>
            </Box>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem
                onClick={handleMenuClose}
                to="/user/profile/account"
                sx={{ mx: 1 }}
            >
                My Profile
            </MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem
                onClick={handleMenuClose}
                sx={{ mx: 1 }}
            >
                My account
            </MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem
                onClick={handleLogout}
                sx={{ mx: 1 }}
            >
                Logout
            </MenuItem>
        </Menu>
    )
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => navigate("/")}
                    >
                        <img src={logoImg} alt="logo" style={{ width: "45px", height: "45px", borderRadius: "5px" }}
                        />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: "3px" }}>
                        Titus
                    </Typography>
                    {user && (
                        <Box>
                            <Avatar
                                onClick={handleProfileMenuOpen}
                                src={avtImg}
                                // alt="Truong "
                                // src={user.avatarUrl}
                                alt={user.name}
                                sx={{ width: 32, height: 32 }}
                            />
                            {renderMenu}
                        </Box>
                    )}
                    {!user && (
                        <div>
                            <Link sx={{ backgroundColor: "white", margin: 1 }} underline="none" component={RouterLink} to="/login ">Login</Link >
                            <Link sx={{ backgroundColor: "white" }} underline="none" component={RouterLink} to='/register'  >Sign Up</Link >
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MainHeader;