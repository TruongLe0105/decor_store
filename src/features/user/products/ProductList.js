import { Button, Container, Divider, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_HOME_PAGE } from '../../../app/config';
import DividerText from '../../../components/form/DividerText';
import ProductCard from './ProductCard';
import { getProducts } from './productSlice';


function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productsById, currentPageProducts } = useSelector(state => state.product);
    const products = currentPageProducts.map((productId) => productsById[productId]);
    const limit = PRODUCTS_HOME_PAGE;

    useEffect(() => {
        dispatch(getProducts({ limit }));
    }, [dispatch, limit]);

    const arrCategoryTree = products.filter(product => product.categories === "Cây cảnh").slice(0, 8);
    const arrCategoryModel = products.filter(product => product.categories === "Mô hình trang trí").slice(0, 8);

    return (
        <>
            <Container
                sx={{
                    mt: { xs: 12, sm: 14 },
                    textAlign: "center",
                    fontSize: { xs: "0.4rem", sm: "1.2rem" }
                }}>
                <DividerText text="SẢN PHẨM NỔI BẬT" />
                <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                />
                <Grid container spacing={1}>
                    {arrCategoryTree.length > 0 && arrCategoryTree.map(product => (
                        <Grid key={product._id} item xs={4} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                    }
                </Grid>
                <Button
                    sx={{
                        marginBottom: { xs: 1, sm: 3 },
                        marginTop: 2,
                        fontSize: { xs: "0.6rem", sm: "1.2rem" },
                        border: "1px solid #C4CDD5"
                    }}
                    onClick={() => navigate("/products/categories/Cây-cảnh")}>
                    XEM THÊM
                </Button>
                <DividerText text="MÔ HÌNH TRANG TRÍ" />
                <Grid container spacing={1}>
                    {arrCategoryModel.length !== 0 && arrCategoryModel.map(product => (
                        <Grid key={product._id} item xs={4} sm={4} md={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                    }
                </Grid>
                <Button
                    sx={{
                        margin: 2,
                        fontSize: { xs: "0.6rem", sm: "1.2rem" },
                        border: "1px solid #C4CDD5"
                    }}
                    onClick={() => navigate("/products/categories/Mô-hình-trang-trí")}>
                    XEM THÊM
                </Button>
            </Container>
        </>
    )
};

export default ProductList;