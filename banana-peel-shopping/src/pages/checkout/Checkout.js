import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({checkedItems, setCheckedItems}) => {
    return (
        <div>
            <Link className="cart-btn" to='/Cart'>
                te
            </Link>
            test
            {console.log(checkedItems)}
        </div>
        
    );

}

export default Checkout;