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
  const [email, setEmail] = useState("");
  const API_KEY =
    "60428ac9f093651ef3a1becbad12071657c8ea401dc7a02f0f49c9e00ff89159";
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
  
  //On change handling
  const onChangeDisc = (e) => {
    setEmail(e.target.value);
    console.log(email);
  }

  //API for email discount
  const handleDiscount = async (e) => {
    e.preventDefault();

    if (email) {  
      await axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
        data: {
          senderId: "e8387ff0-fb67-40f5-b3f2-822571e1c02c",
          to: "e8387ff0-fb67-40f5-b3f2-822571e1c02c@mailslurp.com",
          subject: `BananaPeel - You received a discount!`,
          body: `Good day ${email}! You have received a one-time 20% discount on all of our items using this voucher: ${(Math.random() + 1).toString(36).substring(7)}. Shop at https://bananapeel.com`,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (user.name !== '' &&
      user.contact !== '' &&
      user.email !== '') &&
      user.name.match(/^[A-Za-z]|[A-Za-z][A-Za-z\s]+$/)
    ) {
      setConfirm(true);
      await axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
        data: {
          senderId: "e8387ff0-fb67-40f5-b3f2-822571e1c02c",
          to: "e8387ff0-fb67-40f5-b3f2-822571e1c02c@mailslurp.com",
          subject: `BananaPeel - Order for ${user.name}`,
          body: `Good day, user ${user.name}! We have received your order entailing these following items: ${message}. With total price of: $${itemTotal}. To confirm order, click the confirmation link below https://bananapeel.com`,
        },
      });
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
          <Link
            className="cart-btn"
            to="/Cart"
            onClick={() => {
              setCheckedItems((prevState) => {
                const newState = prevState.map((obj) => {
                  return { ...obj, checked: false };
                });
                return newState;
              });
            }}
          >
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
              <p className="total-amt"> Total Amount: <span className="prc">${Number(itemTotal.toFixed(2))}</span> </p>
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
            <form className="discount-form" onSubmit={handleDiscount}>
              <input
                className="d-email-input checkout-input"
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={onChangeDisc}
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
        <div className="item-info cart-info">
          <header>
            <h4 className="title">{title}</h4>
            <h4 className="price">Unit Price: <span className="prc">${price}</span></h4>
          </header>
          <p className="item-text desc">{desc}</p>
          <div>
            <h4>Item Qty: <span className="prc">{qty}</span></h4>
            <h4 className="price">
              Item Total: <span className="prc">${Number((price * qty).toFixed(2))}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
