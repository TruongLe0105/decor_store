import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../features/products/ProductCard';
import { PRODUCTS_PER_PAGE } from "../app/config"
import { getProducts, resetProducts } from '../features/products/productSlice';
import Collections from '../components/Collections';

function CategoryPage() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const params = useParams();

    const categories = params.category.split("-").join(" ")

    const {
        productsById,
        currentPageProducts,
    } = useSelector(state => state.product)

    const products = currentPageProducts.map(productId => productsById[productId]);

    useEffect(() => {
        const limit = PRODUCTS_PER_PAGE;
        if (categories) {
            dispatch(getProducts({ categories, page, limit }));
            dispatch(resetProducts());
        }
    }, [dispatch, categories, page]);

    return (
        <>
            <Collections />
            <Container>
                <Typography>
                    {products.length > 0 ? products.description : "Product not description"}
                </Typography>
                <Grid container spacing={1}>
                    {products.length > 0 && products.map(product => (
                        <Grid key={product._id} item xs={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default CategoryPage;
