import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux'
import { FormProvider, FTextField } from '../../form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { addProductByAdmin } from '../../../features/user/products/productSlice';

const AddNewProducts = Yup.object().shape({
    name: Yup.string().required("Missing product name"),
    categories: Yup.string().required("Missing categories"),
    imageUrl: Yup.string().required("Missing imageUrl"),
    quantity: Yup.number().required("Missing quantity"),
    price: Yup.number().required("Missing price"),
});

const defaultValues = {
    name: "",
    price: "",
    quantity: "",
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
        reset,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = (data) => {
        dispatch(addProductByAdmin({ ...data }));
        reset()
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
                mr: 2,
            }}>
                <Button
                    sx={{
                        fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1.1rem" },
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
                fullWidth
            >
                <Container sx={{
                    height: "350px",
                }} >
                    <Typography sx={{
                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                        textAlign: "center"
                    }}>ADD PRODUCTS</Typography>
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
}

export default AddProductByAdmin;