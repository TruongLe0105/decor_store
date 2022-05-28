import { Box, Card, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import OrderForm from './OrderForm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';


function PurchaseForm() {
    const [currentTab, setCurrentTab] = useState("Đang xử lí");

    const handleChangeTab = (newValue) => {
        setCurrentTab(newValue);
    };

    const Icon1 = (
        <LocalShippingIcon
            sx={{
                mr: 1,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                color: "orange"
            }}
        />
    )

    const Icon2 = (
        <PendingIcon
            sx={{
                mr: 1,
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                color: "green"
            }}
        />
    );

    const PURCHASE_TABS = [
        {
            value: "Đang xử lí",
            component:
                <OrderForm
                    status="pending"
                    text="Chờ lấy hàng"
                    contentBtn="Hủy đơn hàng"
                    icon={Icon2}
                />,
        },
        {
            value: "Đang giao hàng",
            component:
                <OrderForm
                    status="shipping"
                    text="Đang giao hàng"
                    contentBtn="Đã nhận hàng"
                    icon={Icon1}
                />,
        },
        {
            value: "Đã giao",
            component:
                <OrderForm
                    status="completed"
                    text="Giao hàng thành công"
                    contentBtn="Mua lại"
                    icon={Icon1}
                />,
        },
        {
            value: "Đã hủy",
            component:
                <OrderForm
                    status="declined"
                    contentBtn="Mua lại"
                />,
        },
    ];

    return (
        <Box>
            <Card
                sx={{
                    margin: 1,
                }}
            >
                <Tabs
                    value={currentTab}
                    onChange={(e, value) => handleChangeTab(value)}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    {PURCHASE_TABS.map((tab) => (
                        <Tab
                            sx={{
                                fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                                marginLeft: { xs: 0, sm: 0, md: 12 },
                            }}
                            key={tab.value}
                            value={tab.value}
                            label={tab.value}
                        />
                    ))}
                </Tabs>
            </Card>
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