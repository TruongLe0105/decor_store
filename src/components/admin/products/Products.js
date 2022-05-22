import {
    Container,
    Grid,
    Stack,
    Typography,
    Box,
    Pagination
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { PRODUCTS_PER_PAGE } from '../../../app/config';
import SearchInput from '../../SearchInput';
import AddProductByAdmin from './AddProductByAdmin';
import { getProducts } from '../../../features/user/products/productSlice';
import ProductCard from '../../../features/user/products/ProductCard';

function Products({ admin }) {
    const [name, setName] = React.useState("");
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch();

    const {
        productsById,
        currentPageProducts,
        singleProductChanged,
        quantityProducts,
        totalPage,
    }
        = useSelector(state => state.product);
    let products = currentPageProducts.map((productId) => productsById[productId]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSubmit = (name) => {
        setName(name);
    }

    useEffect(() => {
        dispatch(getProducts({ name, limit: PRODUCTS_PER_PAGE, page }));
    }, [dispatch, page, name, singleProductChanged, quantityProducts]);


    return (
        <Stack
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography sx={{
                textAlign: "center",
                fontFamily: "cursive",
                fontSize: { xs: "1rem", md: "1.6rem" },
                mb: { xs: 1, md: 2 }
            }}>PRODUCTS</Typography>
            <Box sx={{
                ml: 2,
                display: "flex",
                alignItems: "center"
            }}>
                <SearchInput handleSubmit={handleSubmit} />
                <RestartAltIcon
                    onClick={() => setName("")}
                    sx={{
                        fontSize: { xs: "1.3rem", md: "2rem" },
                        color: "green",
                        mr: 14,
                        cursor: "pointer"
                    }} />
                <AddProductByAdmin products={products} />
            </Box>
            <Container>
                <Pagination
                    sx={{ margin: 1 }}
                    component="div"
                    count={totalPage ? totalPage : 0}
                    page={page}
                    onChange={handleChangePage}
                />
                <Grid container spacing={1}>
                    {products.length !== 0 &&
                        products.map((product) =>
                        (
                            <Grid key={product._id} item xs={4} md={4} lg={3}>
                                <ProductCard admin={admin} product={product} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Stack>
    )
};




export default Products;