import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import Customers from './Customers'
import Dashboard from './Dashboard'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import Orders from './orders/Orders';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { makeStyles } from '@mui/styles';
import Products from './products/Products';

const useStyle = makeStyles({
    root: {
        backgroundColor: "#fafafa",
        color: '#008e97',
        fontSize: { xs: "0.8rem", md: "1.1rem" },
    },
    button: {
        marginBottom: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    }
});

function AdminRole({ admin }) {
    const [selectedTab, setSelectedTab] = useState("orders"); //customers, products, orders

    const classes = useStyle();

    return (
        <Stack sx={{
            mt: { md: "100px", xs: "60px" },
        }}>
            {admin && (
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                }} >
                    <Box
                        className={classes.root}
                        sx={{
                            height: { md: "400px", xs: "10%" },
                            position: { md: "fixed", xs: "none" },
                            display: "flex",
                            flexDirection: { xs: "row", md: "column" },
                            justifyContent: { xs: "none", md: "flex-start" },
                            alignItems: { xs: "none", md: "flex-start" },
                            width: { xs: "70%", md: "20%" },
                            padding: { md: 1, xs: 0 },
                        }}>
                        <Box
                            onClick={() => setSelectedTab('dashboard')}
                            className={classes.button}
                            sx={{ padding: 1, width: { md: "100%", xs: "40px" } }}
                        >
                            <DashboardCustomizeIcon
                                sx={{
                                    display: { xs: "none", md: "block" },
                                }}
                            />
                            <Button
                                sx={{
                                    fontSize: { xs: "0.5rem", md: "0.9rem" },
                                    width: { md: "100%", xs: "45px" },
                                    marginLeft: { xs: 0, md: 1 },
                                }}
                                variant="contained"
                            >Dashboard</Button>
                        </Box>
                        <Box
                            sx={{ padding: 1, width: { md: "100%", xs: "40px" } }}
                            onClick={() => setSelectedTab('customers')}
                            className={classes.button}
                        >
                            <SupervisedUserCircleIcon
                                sx={{
                                    display: { xs: "none", md: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", md: 1 },
                                    fontSize: { xs: "0.5rem", md: "0.9rem" },
                                    width: { md: "100%", xs: "45px" },
                                }}
                                variant='contained'
                            >Customers</Button>
                        </Box>
                        <Box
                            sx={{ padding: 1, width: { md: "100%", xs: "40px" } }}
                            className={classes.button}
                            onClick={() => setSelectedTab('products')}
                        >
                            <InventorySharpIcon

                                sx={{

                                    display: { xs: "none", md: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", md: 1 },
                                    fontSize: { xs: "0.5rem", md: "0.9rem" },
                                    width: { md: "100%", xs: "45px" },
                                }}
                                variant='contained'
                            >Products</Button>
                        </Box>
                        <Box
                            sx={{ padding: 1, width: { md: "100%", xs: "40px" } }}
                            className={classes.button}
                            onClick={() => setSelectedTab('orders')}>
                            <WidgetsIcon
                                sx={{
                                    display: { xs: "none", md: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", md: 1 },
                                    width: { md: "100%", xs: "45px" },
                                    fontSize: { xs: "0.5rem", md: "0.9rem" },
                                }}
                                variant='contained'
                            >Orders</Button>
                        </Box>
                    </Box>
                    <Box sx={{ ml: { md: "20%", xs: "0" }, width: { xs: "100%", md: "80%" } }} >
                        {selectedTab === "dashboard" && <Dashboard />}
                        {selectedTab === "customers" && <Customers />}
                        {selectedTab === "products" && <Products admin={admin} />}
                        {selectedTab === "orders" && <Orders />}
                    </Box>
                </Box>
            )}
        </Stack>

    )
}

export default AdminRole;
