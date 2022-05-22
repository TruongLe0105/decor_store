import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteAddress } from '../../../features/user/userSlice';

function DeleteAddress({ addressId }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAddress = () => {
        handleClose();
        dispatch(deleteAddress({ addressId }));
    }

    return (
        <div>
            <Typography sx={{
                textDecoration: "underline",
                fontSize: { xs: "0.7rem", md: "1rem" },
                marginLeft: 2
            }}
                onClick={handleClickOpen}>
                Xóa
            </Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }} id="alert-dialog-description">
                        Xác nhận xóa địa chỉ này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }} onClick={handleDeleteAddress} autoFocus>Xác nhận</Button>
                    <Button sx={{ fontSize: { xs: "0.7rem", md: "1rem" } }} onClick={handleClose}>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteAddress;
