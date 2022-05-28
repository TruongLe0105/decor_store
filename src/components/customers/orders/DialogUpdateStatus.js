import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { buyAgainOldOrder, updateOrder } from '../../../features/user/order/orderSlice';
import { useNavigate } from 'react-router-dom';

function DialogUpdateStatus({ orderId, content, newStatus }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelOrder = () => {
        handleClose();
        dispatch(updateOrder({ orderId, status: newStatus }));
    };

    const handleBuyAgain = () => {
        navigate("/checkout");
        dispatch(buyAgainOldOrder({ orderId }));
    }

    return (
        <div>
            {newStatus === "declined" && (
                <>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        sx={{
                            fontSize: { xs: "0.4rem", sm: "0.7rem" }
                        }}
                    >{content}
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" autoFocus>
                                Hủy đơn hàng này?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelOrder}>Xác nhận</Button>
                            <Button onClick={handleClose}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
            {newStatus === "completed" && (
                <>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        sx={{
                            fontSize: { xs: "0.4rem", sm: "0.7rem" }
                        }}
                    >{content}
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" autoFocus>
                                Bạn đã nhận được hàng?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCancelOrder}>Xác nhận</Button>
                            <Button onClick={handleClose}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
            {newStatus === "buyAgain" && (
                <Button
                    onClick={handleBuyAgain}
                    variant="contained"
                    sx={{
                        fontSize: { xs: "0.4rem", sm: "0.7rem" }
                    }}
                >{content}
                </Button>
            )}
        </div>
    );
};

export default DialogUpdateStatus;
