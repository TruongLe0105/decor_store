import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../features/products/ProductCard';
import { getProducts, resetProducts } from '../features/products/productSlice';

function CategoryPage() {
    const [page, setPage] = useState(1);
    const params = useParams();
    const dispatch = useDispatch();

    const categories = params.category.split("-").join(" ")

    const {
        productsById,
        currentPageProducts,
        totalProducts,
        totalPage
    } = useSelector(state => state.product)

    const products = currentPageProducts.map(productId => productsById[productId]);

    useEffect(() => {
        dispatch(getProducts({ categories, page }));
        dispatch(resetProducts());
    }, [dispatch, categories, page]);

    return (
        <Container>
            <Typography>
                {products[0] ? products[0].description : "Product not description"}
            </Typography>
            <Grid container spacing={1}>
                {products[0] && products.map(product => (
                    <Grid key={product._id} item xs={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryPage;
