import React from 'react';
import useAuth from '../hooks/useAuth';
import AdminRole from '../components/admin/AdminRole';
import { Stack } from '@mui/material';
import ProductList from '../features/user/products/ProductList';
import Collections from '../components/customers/address/Collections';

function HomePage() {

    const { user } = useAuth();

    const role = user ? user.role : false;
    return (
        <Stack sx={{
            backgroundColor: "#fafafa",
            maxWidth: "100%"
        }}
        >
            {role === "admin" && <AdminRole admin={role} />}
            {role !== "admin" && (
                <div>
                    <Collections />
                    <ProductList />
                </div>
            )}
        </Stack>
    );
};

export default HomePage;