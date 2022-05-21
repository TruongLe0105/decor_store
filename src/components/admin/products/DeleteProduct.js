import React, { useState } from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { deleteProductByAdmin } from '../../../features/products/productSlice';
import { useDispatch } from 'react-redux';


function DeleteProduct({ productId }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleDelete = () => {
        handleClose();
        dispatch(deleteProductByAdmin({ productId }))
    }

    return (
        <div>
            <DeleteSweepIcon
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
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure delete this product"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteProduct;