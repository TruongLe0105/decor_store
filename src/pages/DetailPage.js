import { CardMedia, Container, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail, resetProducts } from '../features/products/productSlice';

function DetailPage() {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            dispatch(getProductDetail(params.id));
            dispatch(resetProducts());
        }
    }, [dispatch, params]);


    const { productsById } = useSelector(state => state.product)
    const { name, price, imageUrl, description } = productsById;
    return (
        <Container sx={{ mt: 5, height: "100%", display: "flex" }}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                sx={{
                    height: "100vh",
                    maxWidth: "40%",
                    borderRadius: "5px",
                    marginRight: 5,
                }}
            />
            <Stack>
                <Typography>{name}</Typography>
                <Typography>{price}</Typography>
                <Divider />
                <Typography>Màu sắc</Typography>
                <Typography>Kích thước</Typography>
                <Typography>Số lượng</Typography>

            </Stack>

        </Container >
    );
};

export default DetailPage;


