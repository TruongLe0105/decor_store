import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react';
import { fCurrency } from '../../../utils/numberFormat';
import DialogOrder from './DialogOrder';
import StatusHandle from './StatusHandle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';

function TableOrders({ orders }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Customers
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Phone
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Address
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Order
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              TotalPrice
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Date
            </TableCell>
            <TableCell sx={{ fontSize: { md: "1.3rem", xs: "0.8rem" }, fontFamily: "bold" }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 && orders.map(({
            _id,
            cartProducts,
            totalPrice,
            numberOfPhone,
            receiver,
            address,
            status,
            updatedAt
          }) => (
            <TableRow key={_id}>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                {receiver}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                {numberOfPhone}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                {address}
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                <DialogOrder products={cartProducts} />
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                {fCurrency(totalPrice)}đ
              </TableCell>
              <TableCell sx={{ fontSize: { xs: "0.6rem", md: "0.8rem" } }}>
                {updatedAt}
              </TableCell >
              {status === "pending" && (
                <StatusHandle
                  orderId={_id} status={status} />
              )}
              {status === "shipping" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "0.9rem" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                  {status} <LocalShippingIcon sx={{
                    color: "orange",
                    cursor: "pointer"
                  }} />
                </TableCell>
              )}
              {status === "completed" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "0.9rem" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  {status} <CheckCircleIcon sx={{
                    color: "green",
                    cursor: "pointer"
                  }} />
                </TableCell>
              )}
              {status === "declined" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "0.9rem" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  {status} <CancelIcon sx={{
                    color: "red",
                    cursor: "pointer"
                  }} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableOrders