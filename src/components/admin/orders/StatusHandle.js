import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PendingIcon from '@mui/icons-material/Pending';
import { TableCell } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateOrderByAdmin } from '../../../features/admin/adminSlice';

function StatusHandle({ status, orderId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    dispatch(updateOrderByAdmin({ status: "shipping", orderId }))
    handleClose();
  }

  return (
    <TableCell sx={{
      fontSize: { xs: "0.7rem", md: "0.9rem" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {status}
      <PendingIcon
        sx={{ color: "green" }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order Confirmed?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOrder} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </TableCell>
  );
}

export default StatusHandle;