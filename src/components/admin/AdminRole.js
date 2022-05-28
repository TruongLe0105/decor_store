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
        fontSize: { xs: "0.8rem", sm: "1.1rem" },
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
            mt: { sm: "100px", xs: "55px" },
        }}>
            {admin && (
                <Box sx={{
                    display: "flex",
                }} >
                    <Box
                        className={classes.root}
                        sx={{
                            position: "fixed",
                            zIndex: "800",
                            display: "flex",
                            flexDirection: { xs: "row", sm: "column" },
                            height: { sm: "200px", xs: "40px" },
                            width: { xs: "100%", sm: "25%", md: "20%" },
                            padding: { sm: 1, xs: 0 },
                        }}>
                        <Box
                            onClick={() => setSelectedTab('dashboard')}
                            className={classes.button}
                            sx={{
                                padding: 1,
                                // pl: { xs: 2, sm: 0 },
                                width: { sm: "100%", xs: "40px" }
                            }}
                        >
                            <DashboardCustomizeIcon
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                }}
                            />
                            <Button
                                sx={{
                                    fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                    width: "100%",
                                    marginLeft: { xs: 0, sm: 1 },
                                }}
                                variant="contained"
                            >Dashboard</Button>
                        </Box>
                        <Box
                            sx={{
                                padding: 1,
                                width: { sm: "100%", xs: "40px" }
                            }}
                            onClick={() => setSelectedTab('customers')}
                            className={classes.button}
                        >
                            <SupervisedUserCircleIcon
                                sx={{
                                    display: { xs: "none", sm: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", sm: 1 },
                                    fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                    width: "100%",
                                }}
                                variant='contained'
                            >Customers</Button>
                        </Box>
                        <Box
                            sx={{
                                padding: 1,
                                width: { sm: "100%", xs: "40px" }
                            }}
                            className={classes.button}
                            onClick={() => setSelectedTab('products')}
                        >
                            <InventorySharpIcon

                                sx={{

                                    display: { xs: "none", sm: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", sm: 1 },
                                    fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                    width: { sm: "100%", xs: "100%" },
                                }}
                                variant='contained'
                            >Products</Button>
                        </Box>
                        <Box
                            sx={{
                                padding: 1,
                                width: { sm: "100%", xs: "40px" }
                            }}
                            className={classes.button}
                            onClick={() => setSelectedTab('orders')}>
                            <WidgetsIcon
                                sx={{
                                    display: { xs: "none", sm: "block" }
                                }}
                            />
                            <Button
                                sx={{
                                    marginLeft: { xs: "0", sm: 1 },
                                    width: { sm: "100%", xs: "100%" },
                                    fontSize: { xs: "0.5rem", sm: "0.7rem", md: "0.9rem" },
                                }}
                                variant='contained'
                            >Orders</Button>
                        </Box>
                    </Box>
                    <Box sx={{
                        ml: { xs: "0", sm: "25%", md: "20%" },
                        width: { xs: "100%", sm: "75%", md: "80%" }
                    }}
                    >
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
