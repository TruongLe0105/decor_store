import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
    Box,
    Card,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchInput from '../SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfUsers } from '../../features/admin/adminSlice';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

function Customers() {
    const [userName, setUserName] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();

    const { usersById, currentPageUsers, totalUsers } = useSelector(state => state.admin);
    const users = currentPageUsers.map((userId) => usersById[userId]);

    React.useEffect(() => {
        dispatch(getListOfUsers({ userName, page: page + 1, limit: rowsPerPage }));
    }, [userName, page, rowsPerPage, dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSubmit = (userName) => {
        setUserName(userName);
    }

    return (
        <Stack spacing={1} sx={{
            width: "100%",
        }}>
            <Box
                sx={{
                    backgroundColor: "white",
                    width: { xs: "100%", md: "100%" },
                    mt: { xs: 7, sm: 0 }
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
                        >CUSTOMERS</Typography>
                        <Box textAlign="center"
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    margin: { xs: 1, md: 1 }
                                }}>
                                <AddIcon sx={{ fontSize: { xs: "0.7rem", md: "1.2rem" } }} />
                                <Typography sx={{ fontSize: { xs: "0.6rem", md: "1rem" } }}>New User</Typography>
                            </Button>
                        </Box>
                    </Box>
                    <Card sx={{ padding: { xs: 0, md: 2 } }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: { xs: 1, sm: 2 },
                            width: "600px"
                        }}>
                            <SearchInput handleSubmit={handleSubmit} />
                            <RestartAltIcon
                                onClick={() => setUserName("")}
                                sx={{
                                    fontSize: { xs: "1.3rem", md: "2rem" },
                                    color: "green",
                                    cursor: "pointer"
                                }} />
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.6rem" },
                                                fontFamily: "bold"
                                            }}
                                        >
                                            UserName
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.6rem" },
                                                fontFamily: "bold"
                                            }}
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.6rem" },
                                                fontFamily: "bold"
                                            }}
                                        >
                                            City
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.6rem" },
                                                fontFamily: "bold"
                                            }}
                                        >
                                            Country
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontSize: { md: "1.3rem", sm: "0.9rem", xs: "0.6rem" },
                                                fontFamily: "bold"
                                            }}
                                        >
                                            Phone
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.length > 0 && users.map(({ _id, userName, city, country, email, numberOfPhone, role }) => (
                                        <TableRow key={_id}>
                                            <TableCell sx={{
                                            }}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "flex-start",
                                                }}>
                                                    {role === "admin" &&
                                                        <AdminPanelSettingsIcon
                                                            sx={{
                                                                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                                                                color: "red"
                                                            }}
                                                        />}
                                                    {role === "user" &&
                                                        <PersonIcon
                                                            sx={{
                                                                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                                                                color: "#008e97"
                                                            }}
                                                        />}
                                                    <Typography
                                                        sx={{
                                                            fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                                            opacity: 0.8
                                                        }}>{userName}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                                    opacity: 0.8
                                                }}>
                                                {email}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" } }}>
                                                {city}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" } }}>
                                                {country}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" } }}>
                                                {numberOfPhone}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{
                                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                                {
                                    display: { xs: "none", md: "block" },
                                },
                            }}
                            size="small"
                            component="div"
                            count={totalUsers ? totalUsers : 0}
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
    );
};

export default Customers;