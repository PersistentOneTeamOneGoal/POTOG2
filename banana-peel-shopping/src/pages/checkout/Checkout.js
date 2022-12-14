import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import { HiOutlineShoppingCart } from "react-icons/hi";
import logo from "../../assets/logo-bp.png";
import logoWhite from "../../assets/logo-bp-white3.png";

const Checkout = ({
  checkedItems,
  itemTotal,
  setCartItems,
  setCheckedItems,
  setFlopItems,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const API_KEY =
    "ad904c1fb1a8cb891cba6e8e05a98a98ce41bf19e27aa9922610884abad56aa1";
  const axios = require("axios");
  const message = checkedItems
    .map((item) => ` ${item.title} Qty: ${item.qty}`)
    .join(", ");

  const onChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;

    setUser({
      ...user,
      [name]: value,
    });
  };
  console.log("log", confirm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if((user.name && user.contact && user.email) && user.name.match(/^[A-Za-z]+$/)){
      setConfirm(true);
      await axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
        data: {
          senderId: "11eafd1d-4c35-4e6a-ab1d-d371ac475534",
          to: "11eafd1d-4c35-4e6a-ab1d-d371ac475534@mailslurp.com",
          subject: `BananaPeel - Order for ${user.name}`,
          body: `Good day, user ${user.name}! We have received your order entailing these following items: ${message}. With total price of: $${itemTotal}. To confirm order, click the confirmation link below https://bananapeel.com`,
        },
      })
    }
  };

  return (
    <div className="checkout-container">
      {confirm && (
        <div className="receipt-overlay">
          <div className="receipt-modal">
            <h2 className="receipt-header">Thank you for your purchase!</h2>

            <div className="receipt-details">
              <div className="order-header">
                <table id="checkout-table">
                  <tr>
                    <td className="t-1">Name: </td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td className="t-1">Email: </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td className="t-1">Contact No.: </td>
                    <td>{user.contact}</td>
                  </tr>
                </table>
              </div>

              <div className="order-body">
                {checkedItems.map((item) => {
                  return (                    
                    <div className="order-body container">
                      <p className="order-body order-title">{item.title}</p>
                      <div className="order-body qty"> Qty: {item.qty}</div>
                      <div className="order-body price">
                        {" "}
                        Subtotal: {item.qty * item.price}
                      </div>
                    </div>
                  );
                })}
                <div className="order-footer">
                  <div className="order-footer item-tot">
                    Total: ${Number(itemTotal.toFixed(2))}
                  </div>
                  <div className="order-footer notif">
                    {" "}
                    Receipt is also sent through email.{" "}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/"
              onClick={() => {
                setConfirm(false);
                setCheckedItems([]);
                setCartItems([]);
                setFlopItems((prevState) => {
                  const newState = prevState.map((obj) => {
                    obj.qty = 0;
                    return obj;
                  });
                  return newState;
                });
              }}
              className="dashboard-btn"
            >
              OKAY
            </Link>
          </div>
        </div>
      )}
      {/*Current Nav Banner*/}
      <div className="top-nav-bar">
        <a href="#prod-container" id="text-nav-top">
          SELECTED ITEMS ON SALE! CHECK IT OUT!
        </a>
      </div>

      {/*Navigation Bar*/}
      <section className="nav-bar sticky">
        <div className="nav-container">
          <img className="logo" src={logo} alt="logo"></img>
          {/* <Types types={types} filterItems={filterItems} /> */}
          <Link className="cart-btn" to="/Cart">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </section>

      <div className="title-page">
        <h1 id="text-cart">
          CHECKOUT
          <hr />
        </h1>
      </div>
      <div className="checkout-wrapper">
        <form className="checkout-inputs" onSubmit={handleSubmit}>
          <input
            className="name-input checkout-input"
            type="text"
            placeholder="Name"
            onChange={onChange}
            name="name"
          />
          <input
            className="contact-input checkout-input"
            type="number"
            placeholder="Contact No."
            onChange={onChange}
            name="contact"
          />{" "}
          <input
            className="email-input checkout-input"
            type="email"
            placeholder="Email"
            onChange={onChange}
            name="email"
          />
          <div className="checked-items">
            {checkedItems.map((item, index) => {
              return <CheckOutItem item={item} index={index} />;
            })}
            <div className="items-total">
              <p> Total Amount: ${Number(itemTotal.toFixed(2))} </p>
            </div>
          </div>
          <button className="order-btn">Place Order</button>
        </form>
      </div>

      <footer className="footer-container">
        <div className="footer-main">
          <img className="logo footer-logo" src={logoWhite} alt="logo"></img>
          <p id="bp-slogan">Slip into your path!</p>

          <div className="discount-container">
            <h5 id="discount-text">
              Sign Up & Save 20% Subscribe to our emails for exclusive products,
              discounts and more!
            </h5>
            <form className="discount-form">
              <input
                className="d-email-input checkout-input"
                type="email"
                placeholder="Email Address"
                // onChange={onChange}
                name="email"
              />
              <button className="email-btn">Send me the discount!</button>
            </form>
          </div>
        </div>

        <hr />
        <div className="footer-copyright">
          <p>
            &copy; 2022 ProfElec11076 | PERSISTENT_OneTeamOneGoal | All Rights
            Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

const CheckOutItem = ({ item, index }) => {
  const { title, price, qty, img, desc } = item;

  return (
    <div className="cart-item">
      <div className="item-img-containers">
        <img src={img[0]} className="checkout-slipper" alt={title}></img>
      </div>
      <div>
        <div className="item-info">
          <header>
            <h4>{title}</h4>
            <h4 className="price">Unit Price: ${price}</h4>
          </header>
          <p className="item-text desc">{desc}</p>
          <div>
            <h4>Current item: {qty}</h4>
            <h4 className="price">
              Item Total: ${Number((price * qty).toFixed(2))}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
