import { Container, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PRODUCTS_PER_PAGE } from '../app/config';
import Collections from '../components/collections/Collections';
import ProductCard from '../features/user/products/ProductCard';
import { getProducts, resetProducts } from '../features/user/products/productSlice';



function CategoryPage() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const params = useParams();

    const categories = params.category.split("-").join(" ");
    const limit = PRODUCTS_PER_PAGE;

    const {
        productsById,
        totalPage,
        currentPageProducts,
    } = useSelector(state => state.product)

    const products = currentPageProducts.map(productId => productsById[productId]);

    useEffect(() => {
        if (categories) {
            dispatch(getProducts({ categories, page, limit }));
            dispatch(resetProducts());
        }
    }, [dispatch, categories, page, limit]);

    return (
        <>
            <Collections collection={categories} />
            <Container sx={{
                mt: { xs: 10, sm: 16 }
            }}>
                <Typography
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.8rem" },
                        mb: 1,
                        mt: 1,
                        fontFamily: "cursive"
                    }}
                >{categories}</Typography>
                <Grid container spacing={1}>
                    {products.length > 0 && products.map(product => (
                        <Grid key={product._id} item xs={6} sm={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
                {totalPage > 1 && (
                    <Pagination
                        size="small"
                        count={totalPage}
                        page={page}
                        onChange={(e, page) => setPage(page)}
                        sx={{ mt: 1 }}
                    />
                )}
            </Container>
        </>
    );
};

export default CategoryPage;
