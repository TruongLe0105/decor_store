import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Button, Card, Container, TablePagination, Typography } from '@mui/material';
import SearchInput from '../../SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfOrder } from '../../../features/admin/adminSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableOrders from './TableOrders';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function Orders() {
    const [status, setStatus] = React.useState("pending")
    const [page, setPage] = React.useState(0);
    const [receiver, setReceiver] = React.useState("")
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();

    const { ordersById, currentPageOrders, totalOrders, currentStatusOder } = useSelector(state => state.admin);
    const orders = currentPageOrders.map((orderId) => ordersById[orderId]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleGetAll = () => {
        setStatus("");
        handleClose();
    };
    const handlePending = () => {
        setStatus("pending");
        handleClose();
    };
    const handleShipping = () => {
        setStatus("shipping");
        handleClose();
    };
    const handleCompleted = () => {
        setStatus("completed");
        handleClose();
    };
    const handleDeclined = () => {
        setStatus("declined");
        handleClose();
    };
    const handleSubmit = (receiver) => {
        setReceiver(receiver);
        console.log(receiver);
    }


    React.useEffect(() => {
        dispatch(getListOfOrder({ receiver, status, page: page + 1, limit: rowsPerPage }));
    }, [page, rowsPerPage, status, receiver, currentStatusOder, totalOrders, dispatch]);

    return (
        <Stack spacing={1} sx={{
            width: "100%",
        }}>
            <Box
                sx={{
                    backgroundColor: "white",
                    width: { xs: "100%", md: "100%" }
                }}>
                <Container>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Typography sx={{
                            fontSize: { xs: "1rem", md: "1.6rem" },
                            marginLeft: "20px",
                            fontFamily: "cursive"
                        }}
                        >ORDERS</Typography>
                    </Box>
                    <Card sx={{ padding: { xs: 0, md: 1 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}
                        >
                            <SearchInput handleSubmit={handleSubmit} />
                            <RestartAltIcon
                                onClick={() => setReceiver("")}
                                sx={{
                                    fontSize: { xs: "1.3rem", md: "2rem" },
                                    color: "green",
                                    mr: 14,
                                    cursor: "pointer"
                                }} />
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="outlined"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                filter
                            </Button>
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleGetAll}
                                    disableRipple
                                >
                                    <PendingIcon />
                                    ALL
                                </MenuItem>
                                <MenuItem onClick={handlePending}
                                    disableRipple
                                >
                                    <PendingIcon />
                                    Pending
                                </MenuItem>
                                <MenuItem onClick={handleShipping} disableRipple>
                                    <LocalShippingIcon />
                                    Shipping
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem onClick={handleCompleted} disableRipple>
                                    <CheckCircleIcon />
                                    Completed
                                </MenuItem>
                                <MenuItem onClick={handleDeclined} disableRipple>
                                    <CancelIcon />
                                    declined
                                </MenuItem>
                            </StyledMenu>
                        </Box>
                        <TableOrders orders={orders} />
                        <TablePagination
                            sx={{
                                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                                {
                                    display: { xs: "none", md: "block" },
                                },
                            }}
                            component="div"
                            count={totalOrders ? totalOrders : 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[1, 5, 10]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Container>
            </Box>
        </Stack>
    )
};

export default Orders;