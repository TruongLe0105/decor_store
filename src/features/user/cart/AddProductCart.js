// import { Box, Button } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import DialogProduct from '../../components/DialogProduct';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProductsToCart } from './cartSlice';
// import useAuth from '../../hooks/useAuth';


// function AddProductCart({ product, cartId }) {
//     const [quantity, setQuantity] = useState(0)
//     const dispatch = useDispatch();

//     const productId = product._id;

//     useEffect(() => {
//         if (productId) dispatch(addProductsToCart({ productId, quantity }))
//            // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [productId, dispatch])

//     const handleAddToCart = () => {

//     }

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 width: "100%",
//             }}>
//             <Button
//                 sx={{ marginRight: 1 }}
//                 variant="outlined"
//                 onClick={() => handleAddToCart()}
//             >
//                 <AddShoppingCartIcon />
//             </Button>
//             <DialogProduct product={product} />
//         </Box>
//     )
// };

// export default AddProductCart;