import React, {  } from 'react';
import logo from '../../assets/bananapeel-loaders.png';

const Cart = ({cartItems, setCartItems}) => {
    return (
        <div>
            {cartItems.length ? 
                cartItems.map((items) => {
                    const {id, title, status, type, price, qty, img, desc} = items;
                    return(
                        <div>
                            <button>+</button>
                            <div>
                                <img src={img} alt={title} className="item-img" />
                            </div>
                            <div>
                            <div className="item-info">
                                <header>
                                    <h4>{title}</h4>
                                    <h4 className="price">${price}</h4>
                                </header>
                            </div>
                            </div>
                        </div>
                    );}
                ) : <div> empty </div> }
        </div>
    );
}

const CartItem = ({})

export default Cart;   