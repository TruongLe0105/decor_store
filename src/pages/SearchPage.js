import { Button, Container, Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCTS_HOME_PAGE } from '../app/config';
import DividerText from '../components/form/DividerText';
import ProductCard from '../features/products/ProductCard';
import { getProducts } from '../features/products/productSlice';


function SearchPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const location = useLocation();
    let abc = location.search.substring(3);
    var filterName = abc.split("%20");
    const name = filterName.join("")

    const { productsById, currentPageProducts } = useSelector(state => state.product);
    const products = currentPageProducts.map((productId) => productsById[productId]);
    const limit = PRODUCTS_HOME_PAGE;

    useEffect(() => {
        if (name) dispatch(getProducts({ page, limit, name }));
    }, [dispatch, page, limit, name]);

    return (
        <>
            <Container
                sx={{
                    mt: 1,
                    textAlign: "center"
                }}>
                <DividerText text="SẢN PHẨM NỔI BẬT" />
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                />
                <Grid container spacing={1}>
                    {products.length !== 0 && products.map(product => (
                        <Grid key={product._id} item xs={6} md={4} lg={3}>
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