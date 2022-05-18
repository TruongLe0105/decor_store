import * as React from 'react';
import { Card, Typography, Dialog, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, FTextField } from './form';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAddress } from '../features/user/userSlice';
import { LoadingButton } from '@mui/lab';

const AddNewAddress = Yup.object().shape({
    receiver: Yup.string().required("Nhập họ và tên"),
    address: Yup.string().required("Nhập địa chỉ"),
    numberOfPhone: Yup.number().required("Nhập số điện thoại")
});

function DialogUpdateAddress({ receiver, address, numberOfPhone, addressId }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.user.isLoading);

    const defaultValues = {
        receiver: receiver ? receiver : "",
        address: address ? address : "",
        numberOfPhone: numberOfPhone ? numberOfPhone : "",
    };
    const methods = useForm({
        resolver: yupResolver(AddNewAddress),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = (data) => {
        console.log(typeof addressId)
        dispatch(updateAddress({ addressId, ...data })
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography sx={{ textDecoration: "underline" }} onClick={handleClickOpen}>Sửa</Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"

            >
                <Card>
                    <Container sx={{
                        display: "flex",
                        flexDirection: "column",
                        my: 4,
                        alignItems: "center",
                    }}>
                        <Typography sx={{ fontSize: "1.5rem" }}>Cập nhật địa chỉ</Typography>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{
                                width: 350,
                                textAlign: "center",
                            }} >
                                <FTextField sx={{
                                    marginTop: 3,
                                }} name="receiver" label="Họ và tên" />
                                <FTextField sx={{ marginTop: 3 }} name="numberOfPhone" label="Số điện thoại" />
                                <FTextField sx={{ marginTop: 3, marginBottom: 3 }} name="address" label="Địa chỉ cụ thể" multiline rows={4} />
                                <LoadingButton
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
        </div>
    );
}

export default DialogUpdateAddress;


