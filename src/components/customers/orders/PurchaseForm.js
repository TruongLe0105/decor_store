import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import OrderForm from './OrderForm';

function PurchaseForm() {
    const [currentTab, setCurrentTab] = useState("Đang xử lí");

    const handleChangeTab = (newValue) => {
        setCurrentTab(newValue);
    };

    const PURCHASE_TABS = [
        {
            value: "Đang xử lí",
            component: <OrderForm status="pending" />,
        },
        {
            value: "Đã mua",
            component: <OrderForm status="completed" />,
        },
        {
            value: "Đang giao hàng",
            component: <OrderForm status="shipping" />,
        },
        {
            value: "Đã hủy",
            component: <OrderForm status="declined" />,
        },
    ]
    return (
        <Box
            sx={{
                bgcolor: "white",
            }}>
            <Tabs
                value={currentTab}
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
            >
                {PURCHASE_TABS.map((tab) => (
                    <Tab
                        sx={{
                            display: "flex",
                            fontSize: { xs: "0.5rem", md: "0.8rem" },
                            marginLeft: { xs: 0, md: 12 },
                        }}
                        key={tab.value}
                        value={tab.value}
                        label={tab.value}
                    />
                ))}
            </Tabs>
            {
                PURCHASE_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })
            }
        </Box >
    )
}

export default PurchaseForm;