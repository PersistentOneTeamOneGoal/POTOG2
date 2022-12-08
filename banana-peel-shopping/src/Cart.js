import React, { useState } from 'react';
import flops from './data';
import './Dashboard.css';
import logo from './assets/bananapeel-loaders.png';

const Cart = ({cartItems, setCartItems}) => {
    return (
        <div>
            {cartItems.map((items) => {
                const {id, title, status, type, price, qty, img, desc} = items;
                return(
                    <div></div>
                );
            })}
        </div>
    );
}


export default Cart;