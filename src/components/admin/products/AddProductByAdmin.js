import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Dialog, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
// import { addProductByAdmin } from '../../../features/products/productSlice'
import { FormProvider, FTextField, FUploadImage } from '../../form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { addProductByAdmin } from '../../../features/products/productSlice';

const AddNewProducts = Yup.object().shape({
    name: Yup.string().required("Missing product name"),
    categories: Yup.string().required("Missing categories"),
    imageUrl: Yup.string().required("Missing imageUrl"),
    quantity: Yup.number().required("Missing quantity"),
    price: Yup.number().required("Missing price"),
});

const defaultValues = {
    name: "",
    price: 0,
    quantity: 0,
    categories: "",
    imageUrl: "",
    description: "",
};

function AddProductByAdmin() {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.product.isLoading);

    const methods = useForm({
        resolver: yupResolver(AddNewProducts),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
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
        dispatch(addProductByAdmin({ ...data }));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{
                mr: 2
            }}>
                <Button
                    sx={{
                        fontSize: { xs: "0.5rem", md: "1.2rem" }
                    }}
                    variant='outlined'
                    onClick={handleClickOpen}
                >Add Products</Button>
            </Box>
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
                    }}>ADD PRODUCTS</Typography>
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
}

export default AddProductByAdmin;