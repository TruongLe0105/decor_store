import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react';

import { fCurrency } from '../../../utils/numberFormat';
import DialogOrder from './DialogOrder';
import StatusHandle from './StatusHandle';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import { fDate } from '../../../utils/formatTime';
import AddressOrder from './AddressOrder';

function TableOrders({ orders }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{
              fontSize: { md: "1.3rem", sm: "1rem", xs: "0.8rem" },
              fontFamily: "bold"
            }}
            >
              Customers
            </TableCell>
            <TableCell sx={{
              fontSize: { md: "1.3rem", sm: "1rem", xs: "0.8rem" },
              fontFamily: "bold"
            }}
            >
              Order
            </TableCell>
            <TableCell sx={{
              fontSize: { md: "1.3rem", sm: "1rem", xs: "0.8rem" },
              fontFamily: "bold"
            }}
            >
              TotalPrice
            </TableCell>
            <TableCell sx={{
              fontSize: { md: "1.3rem", sm: "1rem", xs: "0.8rem" },
              fontFamily: "bold"
            }}
            >
              Date
            </TableCell>
            <TableCell sx={{
              fontSize: { md: "1.3rem", sm: "1rem", xs: "0.8rem" },
              fontFamily: "bold"
            }}
            >
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
              <TableCell>
                <AddressOrder
                  receiver={receiver}
                  numberOfPhone={numberOfPhone}
                  address={address}
                />
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                }}
              >
                <DialogOrder products={cartProducts} totalPrice={totalPrice} />
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                }}
              >
                {fCurrency(totalPrice)}đ
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                }}
              >
                {fDate(updatedAt)}
              </TableCell >
              {status === "pending" && (
                <StatusHandle orderId={_id} status={status} />
              )}
              {status === "shipping" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "1rem", sm: "0.8rem" },
                }}>
                  {status} <LocalShippingIcon
                    sx={{
                      color: "orange",
                      cursor: "pointer",
                      fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" }
                    }} />
                </TableCell>
              )}
              {status === "completed" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "1rem", sm: "0.8rem" },
                }}>
                  {status} <CheckCircleIcon
                    sx={{
                      color: "green",
                      cursor: "pointer",
                      fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" }
                    }} />
                </TableCell>
              )}
              {status === "declined" && (
                <TableCell sx={{
                  fontSize: { xs: "0.6rem", md: "1rem", sm: "0.8rem" },
                }}>
                  {status} <CancelIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: { xs: "1rem", sm: "1.4rem", md: "1.8rem" }
                    }} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {orders.length === 0 && (
          <TableBody
            sx={{
              height: "200px"
            }}
          ></TableBody>
        )}
      </Table>
    </TableContainer>
  )
};



export default TableOrders