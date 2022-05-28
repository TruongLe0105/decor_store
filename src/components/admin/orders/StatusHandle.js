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
      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1.1rem" },
    }}>
      {status}
      <PendingIcon
        sx={{
          color: "green",
          fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" },
        }}
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