import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const Checkout = ({ checkedItems }) => {
  return (
    <div>
      <Link className="cart-btn" to="/Cart">
        <FaShoppingCart/>
      </Link>
      
      {
        checkedItems.map((item, index) => {
            return (
                <CheckOutItem item={item} index={index}/>
            )
          }
        )
      }
      {console.log(checkedItems)}
    </div>
  );
};

const CheckOutItem = ({ item, index }) => {
    const {title, price, qty, img, desc} = item;
    return (
        <div>
            
        </div>
    );
}


export default Checkout;
