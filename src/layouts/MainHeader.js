import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Divider, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logoImg from "../logo.png";
import useAuth from '../hooks/useAuth';
import SearchInput from '../components/SearchInput';
import AvatarMenu from '../components/form/AvatarMenu';
import CartWidget from '../components/CartWidget';
import Collections from '../components/Collections';

function MainHeader() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showCartIcon, setShowCartIcon] = React.useState(true)
    const [filterName, setFilterName] = React.useState("");

    const handleSubmit = (searchQuery) => {
        if (searchQuery) {
            navigate("/products/:categories")
            setFilterName(searchQuery);
        }
    };

    const AccessHandle = () => (
        <div style={{ display: "flex" }}>
            <Link
                color="white"
                sx={{ margin: 1 }}
                underline="none"
                component={RouterLink}
                to="/register ">
                Đăng Ký
            </Link >
            <Divider
                orientation="vertical"
                variant="middle"
                flexItem />
            <Link
                color="white"
                sx={{ margin: 1 }}
                underline="none"
                component={RouterLink} to='/login'>Đăng Nhập</Link >
        </div>
    );

    return (
        <>
            <Stack sx={{
                position: "fixed",
                width: "100%",
                zIndex: "900"
            }}>
                <AppBar>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}>
                        <Box sx={{ display: 'flex' }}>
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
                            <Typography variant="h6" component="div" sx={{ margin: 0, fontSize: "2em" }}>
                                Titus
                            </Typography>
                        </Box>
                        <SearchInput handleSubmit={handleSubmit} />
                        {/* {showCartIcon && <CartWidget onClick={() => setShowCartIcon(false)} />} */}
                        {user && (
                            <AvatarMenu />
                        )}
                        {!user && (
                            < AccessHandle />
                        )}
                        <CartWidget />
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    );
}

export default MainHeader;