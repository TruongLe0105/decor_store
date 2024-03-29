import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_HOME_PAGE } from '../app/config';
import ProductCard from '../features/user/products/ProductCard';
import { getProducts } from '../features/user/products/productSlice';
import { useSearchParams } from 'react-router-dom';
import Collections from '../components/collections/Collections';

function SearchPage() {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("q");
    if (!name) setSearchParams(searchParams)

    const { productsById, currentPageProducts } = useSelector(state => state.product);
    const products = currentPageProducts.map((productId) => productsById[productId]);
    const limit = PRODUCTS_HOME_PAGE;

    useEffect(() => {
        if (name) {
            dispatch(getProducts({ limit, name }));
        }
    }, [dispatch, limit, name]);

    return (
        <>
            <Collections />
            <Container
                sx={{
                    mt: 14,
                    textAlign: "center"
                }}>
                <Grid container spacing={1}>
                    {products.length !== 0 && products.map(product => (
                        <Grid key={product._id} item xs={6} sm={4} md={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </>
    )
};

export default SearchPage;