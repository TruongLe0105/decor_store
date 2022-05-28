import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Dialog, Typography } from '@mui/material';
import { FormProvider, FTextField } from '../../form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductByAdmin } from '../../../features/user/products/productSlice';

const UpdateProductSchema = Yup.object().shape({
    name: Yup.string().required("Missing product name"),
    categories: Yup.string().required("Missing categories"),
    imageUrl: Yup.string().required("Missing imageUrl"),
    quantity: Yup.number().required("Missing quantity"),
    price: Yup.number().required("Missing price"),
});

function UpdateProduct({ product }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.product.isLoading);

    const defaultValues = {
        name: product?.name || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        categories: product?.categories || "",
        imageUrl: product?.imageUrl || "",
        description: product?.description || "",
    };

    const methods = useForm({
        resolver: yupResolver(UpdateProductSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = methods;


    const onSubmit = (data) => {
        dispatch(updateProductByAdmin({ productId: product._id, ...data }))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <CreateIcon
                onClick={handleClickOpen}
                sx={{
                    color: "green",
                    margin: 1,
                    cursor: "pointer",
                    fontSize: { xs: "1rem", sm: "1.4rem" }
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Container sx={{
                    height: "350px"
                }} >
                    <Typography sx={{
                        fontSize: { xs: "1rem", md: "1.4rem" },
                        textAlign: "center"
                    }}>UPDATE PRODUCTS</Typography>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2
                        }}>
                            <Box >
                                <Box sx={{ display: "flex" }}>
                                    <FTextField
                                        name="name" label="Product name" sx={{ mr: 1 }}
                                    />
                                    <FTextField name="categories" label="Categories"
                                    />
                                </Box>
                                <Box sx={{ display: "flex" }}>
                                    <FTextField
                                        name="price" label="Price" sx={{ mr: 1 }}
                                    />
                                    <FTextField
                                        name="quantity" label="Quantity"
                                    />
                                </Box>
                                <FTextField
                                    name="imageUrl" label="Image"
                                />
                                <FTextField
                                    multiline rows={2} name="description" label="Description"
                                />
                                <LoadingButton
                                    sx={{ mt: 2 }}
                                    variant="contained"
                                    type="submit"
                                    loading={isSubmitting || isLoading}
                                >
                                    Save
                                </LoadingButton>
                            </Box>
                        </Box>
                    </FormProvider>
                </Container>
            </Dialog>
        </>
    )
};

export default UpdateProduct;