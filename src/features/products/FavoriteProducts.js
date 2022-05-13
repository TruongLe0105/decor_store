import { Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_HOME_PAGE } from '../../app/config';
import DividerText from '../../components/form/DividerText';
import ProductCard from './ProductCard';
import { getProducts, resetProducts } from "./productSlice";


function FavoriteProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const limit = PRODUCTS_HOME_PAGE;
    console.log("limitFavorite", limit)
    const categories = "Cây cảnh";

    useEffect(() => {
        dispatch(getProducts({ categories, limit }));
        dispatch(resetProducts());
    }, []);

    const { productsById, currentPageProducts } = useSelector(state => state.product);
    const products = currentPageProducts.map((productId) => productsById[productId]);
    console.log("arrCategoryTree", products)

    return (
        <>
            <DividerText text="SẢN PHẨM NỔI BẬT" />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid container spacing={1}>
                {products[0] && products.map(product => (
                    <Grid key={product._id} item xs={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))
                }
            </Grid>
            <Button size="large" sx={{ margin: 2 }} onClick={() => navigate("/products/categories/Cây-cảnh")}>
                XEM THÊM
            </Button>
        </>
    )
}

export default FavoriteProducts;