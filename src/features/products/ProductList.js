import { Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_HOME_PAGE } from '../../app/config';
import DividerText from '../../components/form/DividerText';
import useAuth from '../../hooks/useAuth';
import ProductCard from './ProductCard';
import { getProducts, resetProducts } from "./productSlice";


function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productsById, currentPageProducts } = useSelector(state => state.product);
    const products = currentPageProducts.map((productId) => productsById[productId]);

    useEffect(() => {
        const limit = PRODUCTS_HOME_PAGE;
        dispatch(getProducts({ limit }));
    }, [dispatch]);

    const arrCategoryTree = products.filter(product => product.categories === "Cây cảnh").slice(0, 8);
    const arrCategoryModel = products.filter(product => product.categories === "Mô hình trang trí").slice(0, 8);

    return (
        <Container
            sx={{
                mt: 2,
                textAlign: "center"
            }}>
            <DividerText text="SẢN PHẨM NỔI BẬT" />
            <Divider
                orientation="vertical"
                variant="middle"
                flexItem
            />
            <Grid container spacing={1}>
                {arrCategoryTree.length && arrCategoryTree.map(product => (
                    <Grid key={product._id} item xs={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))
                }
            </Grid>
            <Button
                size="large"
                sx={{
                    marginBottom: 6,
                    marginTop: 2,
                    border: "1px solid #C4CDD5"
                }}
                onClick={() => navigate("/products/categories/Cây-cảnh")}>
                XEM THÊM
            </Button>
            <DividerText text="MÔ HÌNH TRANG TRÍ" />
            <Grid container spacing={1}>
                {arrCategoryModel.length && arrCategoryModel.map(product => (
                    <Grid key={product._id} item xs={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))
                }
            </Grid>
            <Button
                size="large"
                sx={{
                    margin: 2,
                    border: "1px solid #C4CDD5"
                }}
                onClick={() => navigate("/products/categories/Mô-hình-trang-trí")}>
                XEM THÊM
            </Button>
        </Container>
    )
};

export default ProductList;