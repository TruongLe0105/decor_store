import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Stack, CardMedia } from '@mui/material';
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
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Link
                color="white"
                sx={{
                    ml: 1,
                    fontSize: { xs: "0.7rem", sm: "1.1rem" }
                }}
                underline="none"
                component={RouterLink}
                to="/register ">
                Đăng Ký
            </Link >
            <span>/</span>
            <Link
                color="white"
                sx={{
                    fontSize: { xs: "0.7rem", sm: "1.1rem" }
                }}
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
                        justifyContent: 'space-around',
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            display: 'flex',
                        }}>
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
                                        width: { xs: "30px", sm: "45px" },
                                        height: { xs: "30px", sm: "45px" },
                                        borderRadius: "5px"
                                    }}
                                />
                            </IconButton>
                            <Typography component="div" sx={{
                                margin: { xs: "5px", sm: "0" },
                                fontSize: { xs: "1.1rem", sm: "2rem" }
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