import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import useAuth from "../../../hooks/useAuth";
import { fCurrency } from "../../../utils/numberFormat";
import ConfirmCheckout from "./ConfirmCheckout";

function CheckoutSummary({ setActiveStep }) {
  const { cart, delivery } = useSelector(state => state.cart);
  const { user } = useAuth();
  const products = cart.products ? cart.products : [];
  const totalPrice = cart.totalPrice;

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "0.8rem", sm: "1.3rem", md: "1.6rem", },
          fontWeight: "600",
          color: "#008e97",
          my: 1
        }}
      >Đơn hàng của bạn</Typography>
      <Divider />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          mb: 1
        }}
      >
        <Box
          sx={{
            display: "flex",
            color: "#008e97",
          }}
        >
          <LocationOnOutlinedIcon
            sx={{
              fontSize: { xs: "0.7rem", sm: "1.3rem", md: "1.6rem", },
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: "0.6rem", sm: "1.3rem", md: "1.6rem", },
            }}
          >Địa chỉ nhận hàng</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 1
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  mr: 1,
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                  fontWeight: "600",
                }}
              >{(delivery.receiver || user.fullName).toUpperCase()}</Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                }}
              >{delivery.numberOfPhone || user.numberOfPhone}</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                // ml: 1
              }}
            >{delivery.address}</Typography>
          </Box>
          <Button
            sx={{
              fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
            }}
          >Thay đổi</Button>
        </Box>
      </Card>
      <Divider />
      <Card>
        <Table>
          <TableHead>
            <TableRow sx={{
              display: "flex",
              height: { xs: "35px", sm: "45px" },
            }}>
              <TableCell
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                  width: { xs: "150%", sm: "100%", md: "60%" },
                }}
              >Sản phẩm</TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                  width: { xs: "100%", sm: { xs: "100%", md: "20%" } }
                }}
              >Số lượng</TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                  width: { xs: "100%", md: "20%" }
                }}
              >Đơn giá</TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.9rem", md: "1rem" },
                  width: { xs: "100%", md: "20%" }
                }}
              >Tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{
            display: "flex",
            flexDirection: "column",
          }}>
            {products.length > 0 && products.map(({ _id, name, price, quantity, imageUrl }) => (
              <TableRow
                key={_id}
                sx={{
                  display: "flex",
                }}>
                <TableCell
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      borderRadius: { xs: 1, sm: 2 },
                      width: { xs: "40px", sm: "70px", md: "100px" },
                      height: { xs: "40px", sm: "70px", md: "100px" },
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt="product"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.4rem", sm: "0.7rem", md: "1rem" },
                      ml: { xs: 0, md: 1 },
                      fontFamily: "monospace",
                    }}
                  >{name}</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", md: "center" },
                    width: { xs: "100%", sm: { xs: "100%", md: "20%" } },
                    fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" },
                  }} >
                  {quantity}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
                    alignItems: "center",
                    display: "flex",
                    width: { xs: "100%", md: "20%" }
                  }}
                >{fCurrency(price)}đ</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    width: { xs: "100%", md: "20%" },
                  }}
                >{fCurrency(price * quantity)}đ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: { xs: 2, sm: 0 },
            margin: 1
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
              ml: 1
            }}
          >Tổng cộng:</Typography>
          <Typography
            sx={{
              color: "#008e97",
              fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" },
              mr: { xs: 0, sm: 6, md: 3 },
              ml: { xs: 3, sm: 1, md: 6 }
            }}
          >{fCurrency(cart.totalPrice)}đ
          </Typography>
        </Box>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: { xs: 1, sm: 3 } }}>
        <ConfirmCheckout
          cartProducts={products}
          delivery={delivery}
          totalPrice={totalPrice}
          user={user}
        />
      </Box>
    </Container >
  );
}

export default CheckoutSummary;
