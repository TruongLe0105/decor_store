import React, { useCallback, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Dialog, Typography } from '@mui/material';
import { FormProvider, FTextField, FUploadImage } from '../../form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProducts, updateProductByAdmin } from '../../../features/products/productSlice';

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
        setValue,
        formState: { isSubmitting }
    } = methods;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue(
                    "imageUrl",
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

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
                    color: "red",
                    margin: 1,
                    cursor: "pointer",
                    fontSize: { xs: "0.8rem", md: "1.4rem" }
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
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
                            mt: 2
                        }}>
                            <Box sx={{
                                mr: 4,
                                width: "80%"
                            }}>
                                <FTextField
                                    name="name" label="Product name" autoFocus
                                />
                                <FTextField name="categories" label="Categories"
                                />
                                <FTextField
                                    name="price" label="Price"
                                />
                                <FTextField
                                    name="quantity" label="Quantity"
                                />
                                <FTextField
                                    multiline rows={2} name="description" label="Description"
                                />
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                ml: 2
                            }}>
                                <FUploadImage
                                    name="imageUrl"
                                    accept="image/*"
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                />
                                <LoadingButton
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