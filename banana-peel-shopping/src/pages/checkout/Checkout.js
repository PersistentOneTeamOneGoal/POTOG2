import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    "6e6afec250b799fa2e541a5cb299e1078d27cea973761e0fa06e629545bc572c";
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
    setConfirm(true);

    await axios({
      method: "POST",
      url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
      data: {
        senderId: "afe12fa4-dfe2-4ee4-a1c3-5a4120970430",
        to: "afe12fa4-dfe2-4ee4-a1c3-5a4120970430@mailslurp.com",
        subject: `BananaPeel - Order for ${user.name}`,
        body: `Good day, user ${user.name}! We have received your order entailing these following items: ${message}. With total price of: $${itemTotal}. To confirm order, click the confirmation link below https://bananapeel.com`,
      },
    }).then((res) => {
      const { data } = res;
      console.log("post ", data);
    });
  };

  return (
    
    <div className="checkout-container">
      {confirm && (
        <div className="receipt-modal">
          <div className="receipt-header">Thank you for your purchase!</div>

          <div className="receipt-details">
            <div className="order-header">
              <h6>Name: </h6>
              <p className="order-name">{user.name}</p>
              <h6>Email: </h6>
              <p className="order-email">{user.email}</p>
              <h6>Contact No.: </h6>
              <p className="order-contact">{user.contact}</p>
            </div>
            <div className="order-body">
              {checkedItems.map((item) => {
                return (
                  <div className="order-body container">
                    <p className="order-body title">{item.title}</p>
                    <div className="order-body qty"> Qty: {item.qty}</div>
                    <div className="order-body price">
                      {" "}
                      Subtotal: {item.qty * item.price}
                    </div>
                  </div>
                );
              })}
              <div className="order-footer">
                <div className="order-footer item-tot">Total: ${itemTotal}</div>
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
      )}
      <div className="checkout-header">
        <img className="logo" src={logo} alt="logo"></img>
        <Link className="cart-btn" to="/Cart">
          <FaShoppingCart />
        </Link>
      </div> */}

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

      <form className="checkout-inputs" onSubmit={handleSubmit}>
        <input
          className="name-input"
          type="text"
          placeholder="Name"
          onChange={onChange}
          name="name"
        />

        <input
          className="contact-input"
          type="number"
          placeholder="Contact No."
          onChange={onChange}
          name="contact"
        />        <input
        className="email-input"
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
      
      <footer className="footer-container">
        <div className="footer-main">
          <img className="logo footer-logo" src={logoWhite} alt="logo"></img>
          <p id="bp-slogan">Create your path!</p>
        </div>
        <hr />
        <div className="footer-copyright">
          <p>
            &copy; Copyright 2022 | ProfElec11076 | PERSISTENT_OneTeamOneGoal
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
      <div className="item-img-container">
        <img src={img[0]} alt={title} className="checkout-slipper" />
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
