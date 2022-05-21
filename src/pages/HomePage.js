import { Collections } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ProductList from "../features/products/ProductList";
import Collection from "../components/Collections";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AdminRole from '../components/admin/AdminRole';
import { Stack } from '@mui/material';

function HomePage() {

    const { user } = useAuth();
    // const navigate = useNavigate();  

    const role = user ? user.role : false;
    // useEffect(() => {
    //     if (role === "user") {
    //         navigate("*")
    //     };
    // }, []);

    return (
        <Stack sx={{
            backgroundColor: "#fafafa",
            maxWidth: "100%"
        }}
        >
            {role === "admin" && <AdminRole admin={role} />}
            {role !== "admin" && (
                <div>
                    <Collection />
                    <ProductList />
                </div>
            )}
        </Stack>
    );
};

export default HomePage;