import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Checkout = ({ checkedItems }) => {
  return (
    <div>
      <Link className="cart-btn" to="/Cart">
        <FaShoppingCart/>
      </Link>
      test
      {console.log(checkedItems)}
    </div>
  );
};

export default Checkout;
