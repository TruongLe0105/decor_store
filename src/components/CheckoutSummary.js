import {
  Box,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils/numberFormat";
import ConfirmCheckout from "./ConfirmCheckout";

function CheckoutSummary() {
  const { cart, delivery } = useSelector(state => state.cart);
  const { user } = useAuth();
  let cartProducts = [];
  cartProducts = cart.products ? cart.products : [];
  const totalPrice = cart.totalPrice;

  return (
    <Container>
      <Typography sx={{ textAlign: "center" }} variant="h4">Đơn hàng của bạn</Typography>
      <Divider />
      <Stack direction="row" spacing={3} justifyContent="space-between" my={2}>
        <Box>
          <Typography sx={{ opacity: "0.5" }}>Ngày đặt hàng</Typography>
          <Typography>{new Date().toLocaleDateString("en-GB")}</Typography>
        </Box>
        <Box>
          <Typography sx={{ opacity: "0.5" }} >Địa chỉ</Typography>
          <Typography>{delivery.address}</Typography>
        </Box>
        <Box>
          <Typography sx={{ opacity: "0.5" }}>Số điện thoại</Typography>
          <Typography>{delivery.numberOfPhone}</Typography>
        </Box>
        <Box>
          <Typography sx={{ opacity: "0.5" }}>Người nhận</Typography>
          <Typography>{delivery.receiver}</Typography>
        </Box>
      </Stack>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.length > 0 && cartProducts.map(({ _id, name, price, quantity, imageUrl }) => (
              <TableRow key={_id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        width: 64,
                        height: 64,
                        mr: "5px",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="product"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Typography variant="body2">
                      {name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{fCurrency(price)}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{fCurrency(quantity * price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Tổng cộng</TableCell>
              <TableCell>
                <Typography>{fCurrency(totalPrice)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <ConfirmCheckout
          cartProducts={cartProducts}
          delivery={delivery}
          totalPrice={totalPrice}
          user={user}
        />
      </Box>
    </Container>
  );
}

export default CheckoutSummary;
