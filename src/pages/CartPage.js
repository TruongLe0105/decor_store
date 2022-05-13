import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductInCart } from '../features/cart/cartSlice';
import useAuth from '../hooks/useAuth';

function CartPage() {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { cartId, _id } = user;
    console.log(user)

    const { totalPrice, productsInCart } = useSelector(state => state.cart);
    if (productsInCart) {
        console.log(productsInCart)
    } else {
        console.log("not found")
    }

    useEffect(() => {
        dispatch(getProductInCart(_id));
    }, [dispatch, _id]);


    return (
        <>
            <Typography>GIỎ HÀNG</Typography>
            {productsInCart.length && (
                <div>
                    {productsInCart.map(e => (
                        <div key={e._id}>{e.name}</div>
                    ))}
                </div>
            )}
            {!productsInCart.length && (
                <div>Không có sán phẩm nào trong giỏ hàng</div>
            )}
        </>
    )
};

export default CartPage;