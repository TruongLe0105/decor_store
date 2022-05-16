import { Collections } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ProductList from "../features/products/ProductList";
import Collection from "../components/Collections";

function HomePage() {
    return (
        <div >
            <Collection />
            <ProductList />
        </div>
    );
};

export default HomePage;