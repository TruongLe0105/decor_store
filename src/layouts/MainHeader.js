import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Divider, Stack, CardMedia } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logoImg from "../logo.png";
import useAuth from '../hooks/useAuth';
import SearchInput from '../components/SearchInput';
import AvatarMenu from '../components/form/AvatarMenu';

function MainHeader() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (filterName) => {
        console.log("filtername", filterName)
        navigate(`/search?q=${filterName}`);
    };

    const AccessHandle = () => (
        <div style={{ display: "flex" }}>
            <Link
                color="white"
                sx={{
                    margin: 1,
                    fontSize: { xs: "0.5rem", md: "1rem" }
                }}
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
                sx={{
                    margin: 1,
                    fontSize: { xs: "0.5rem", md: "1rem" }
                }}
                underline="none"
                component={RouterLink} to='/login'>Đăng Nhập</Link >
        </div>
    );

    return (
        <>
            <Stack sx={{
                position: { md: "fixed", xs: "block" },
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
                                <CardMedia
                                    component="img"
                                    src={logoImg}
                                    alt="logo"
                                    sx={{
                                        width: { xs: "20px", md: "45px" },
                                        height: { xs: "20px", md: "45px" },
                                        borderRadius: "5px"
                                    }}
                                />
                            </IconButton>
                            <Typography component="div" sx={{
                                margin: { xs: "5px", md: "0" },
                                fontSize: { xs: "1rem", md: "2rem" }
                            }}>
                                Titus
                            </Typography>
                        </Box>
                        <SearchInput handleSubmit={handleSubmit} />
                        {user && (
                            <AvatarMenu />
                        )}
                        {!user && (
                            < AccessHandle />
                        )}
                    </Toolbar>
                </AppBar>
            </Stack>
        </>
    );

}
export default MainHeader;