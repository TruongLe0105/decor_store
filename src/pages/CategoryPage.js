import { Container, Grid, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Collections from '../components/customers/address/Collections';
import ProductCard from '../features/user/products/ProductCard';
import { getProducts, resetProducts } from '../features/user/products/productSlice';



function CategoryPage() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const params = useParams();

    const categories = params.category.split("-").join(" ")

    console.log("categories", categories)

    const {
        productsById,
        totalPage,
        currentPageProducts,
    } = useSelector(state => state.product)

    const products = currentPageProducts.map(productId => productsById[productId]);
    console.log("products", products)

    useEffect(() => {
        if (categories) {
            dispatch(getProducts({ categories, page }));
            dispatch(resetProducts());
        }
    }, [dispatch, categories, page]);

    return (
        <>
            <Collections collection={categories} />
            <Container sx={{
                mt: { xs: 10, md: 16 }
            }}>
                <Typography
                    sx={{
                        fontSize: { xs: "1rem", md: "1.8rem" },
                        mb: 1
                    }}
                >{categories}</Typography>
                <Grid container spacing={1}>
                    {products.length > 0 && products.map(product => (
                        <Grid key={product._id} item xs={6} md={4} lg={3}>
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
