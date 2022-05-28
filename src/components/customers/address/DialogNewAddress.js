import * as React from 'react';
import { Card, Typography, Dialog, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewAddressUser } from '../../../features/user/userSlice';
import { FormProvider, FTextField } from '../../form';
import { LoadingButton } from '@mui/lab';

const AddNewAddress = Yup.object().shape({
    receiver: Yup.string().required("Nhập họ và tên"),
    address: Yup.string().required("Nhập địa chỉ"),
    numberOfPhone: Yup.string().required("Nhập số điện thoại")
});

function DialogNewAddress() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.user.isLoading);

    const defaultValues = {
        receiver: "",
        address: "",
        numberOfPhone: "",
    };
    const methods = useForm({
        resolver: yupResolver(AddNewAddress),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = (data) => {
        dispatch(addNewAddressUser({ ...data })
        );
        reset();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography sx={{ fontSize: { xs: "0.7rem", sm: "1rem" } }} onClick={handleClickOpen}>Thêm Địa Chỉ Mới</Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"

            >
                <Card sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}>
                    <Container sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        my: 1,
                        alignItems: "center",
                    }
                    } >
                        <Typography sx={{ fontSize: { xs: "0.9rem", md: "1.5rem" } }}>Địa chỉ mới</Typography>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{
                                width: { xs: "220px", md: "300px" },
                                textAlign: "center",
                            }} >
                                <FTextField sx={{
                                    marginTop: 1
                                }} name="receiver" label="Họ và tên" />
                                <FTextField sx={{ marginTop: 2, fontSize: "0.4rem" }} name="numberOfPhone" label="Số điện thoại" />
                                <FTextField sx={{ marginTop: 2, marginBottom: { xs: 1, md: 1 } }} name="address" label="Địa chỉ cụ thể" multiline rows={4} />
                                <LoadingButton
                                    sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }}
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting || isLoading}
                                >
                                    Hoàn Thành
                                </LoadingButton>
                            </Box>
                        </FormProvider>
                    </Container>
                </Card>
            </Dialog>
        </div >
    );
}

export default DialogNewAddress;


