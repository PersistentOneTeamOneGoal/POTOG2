/* eslint-disable jsx-a11y/aria-role */
import React, { useRef, useState } from "react";
import flops from "../../data";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-bp.png";
import logoWhite from "../../assets/logo-bp-white3.png";
import banner from "../../assets/xmas-sale4.png";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";

const allTypes = ["ALL", ...new Set(flops.map((flop) => flop.type))];

const Dashboard = ({ flopItems, setFlopItems, cartItems, setCartItems }) => {
  const [currID, setCurrID] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [types, setTypes] = useState(allTypes);
  //Local States
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [qty, setQty] = useState(0);
  const count = useRef();
  const [email, setEmail] = useState("");
  const API_KEY =
    "60428ac9f093651ef3a1becbad12071657c8ea401dc7a02f0f49c9e00ff89159";
  const axios = require("axios");

  //For filtering items by type
  const filterItems = (type) => {
    if (type === "ALL") {
      setFlopItems(flops);
      return;
    }
    const newItems = flops.filter((flop) => flop.type === type);
    setFlopItems(newItems);
  };

  //Add cart items
  const addCartItems = () => {
    flopItems[currID].qty = flopItems[currID].qty + qty;

    cartItems.map((item) => {
      return item.id === flopItems[currID].id
        ? (flopItems[currID].status = true)
        : flopItems[currID].status;
    });
    console.log(flopItems[currID].status);
    flopItems[currID].qty !== 0 && !flopItems[currID].status
      ? setCartItems([...cartItems, flopItems[currID]])
      : setCartItems([...cartItems]);

    setCartItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === flopItems[currID].id) {
          return { ...obj, qty: flopItems[currID].qty };
        }
        return obj;
      });
      return newState;
    });
  };

  //On change handling
  const onChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

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
          body: `Good day ${email}! You have received a one-time 20% discount on all of our items using this voucher: ${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}. Shop at https://bananapeel.com`,
        },
      });
    }
  };

  return (
    //Main container for the whole dashboard app
    <main>
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
          <Types types={types} filterItems={filterItems} />
          <Link to="/Cart">
            <div className={`cart-num-${cartItems.length}`}>
              {cartItems.length !== 0 && cartItems.length}
            </div>
            <button className="cart cart-btn" data-testid="cart-btn">
              <HiOutlineShoppingCart />
            </button>
          </Link>
        </div>
      </section>

      {/*Promotional Banner*/}
      <section className="banner-container">
        <img className="banner" src={banner} alt="banner"></img>
        <div id="shop-now-container">
          <a href="#prod-container">
            <button className="shop-now">SHOP NOW!</button>
          </a>
        </div>
      </section>

      {/*Specific Item Modal*/}
      {showItemDetail && (
        <ItemModal
          qty={qty}
          setQty={setQty}
          flopItems={flopItems}
          currID={currID}
          setShowItemDetail={setShowItemDetail}
          count={count}
          addCartItems={addCartItems}
        />
      )}

      {/*Product Container and Items*/}
      <section
        data-testid="products-container"
        id="prod-container"
        className="products-container"
      >
        <h1>SHOP FEATURED CATEGORIES</h1>
        <Products
          flopItems={flopItems}
          setCurrID={setCurrID}
          setShowItemDetail={setShowItemDetail}
        />
      </section>

      {/*Footer*/}
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
                onChange={onChange}
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
    </main>
  );
};

//For type buttons
const Types = ({ types, filterItems }) => {
  return (
    <div className="btn-container ">
      {types.map((type, index) => {
        return (
          <a href="#prod-container" key={index}>
            <button
              type="button"
              className="filter-btn footer-menu-filter"
              key={index}
              onClick={() => filterItems(type)}
            >
              {type}
            </button>
          </a>
        );
      })}
    </div>
  );
};

//For products container
const Products = ({ flopItems, setCurrID, setShowItemDetail }) => {
  return (
    <div className="products-section">
      {flopItems.map((flopItem, key) => {
        return (
          <Item
            key={key}
            item={flopItem}
            setCurrID={setCurrID}
            setShowItemDetail={setShowItemDetail}
          />
        );
      })}
    </div>
  );
};

//For product items
const Item = ({ key, item, setCurrID, setShowItemDetail }) => {
  const { id, title, img, price } = item;

  return (
    <article
      key={item.id}
      role="products-item"
      data-testid={`products-item${id}`}
      className="product-item"
    >
      <div>
        <img src={img[0]} alt={title} className="item-img" />
        <div className="item-info">
          <header>
            <h4>{title}</h4>
            <h4 className="price"><span className="prc">${price}</span></h4>
          </header>
        </div>
        <button
          data-testid={`look-btn${id}`}
          className="item-button"
          onClick={() => {
            setCurrID(id - 1);
            setShowItemDetail(true);
          }}
        >
          {" "}
          Quick Look{" "}
        </button>
        {/* )} */}
      </div>
    </article>
  );
};

//Floating modals
const ItemModal = ({
  qty,
  setQty,
  flopItems,
  currID,
  count,
  setShowItemDetail,
  addCartItems,
}) => {
  const [currImg, setCurrImg] = useState(0);
  return (
    <div data-testid="modal" className="lightbox-overlay">
      <div className="lightbox">
        <button
          className="exitItem"
          onClick={() => {
            setQty(0);
            setShowItemDetail(false);
          }}
        >
          <MdOutlineClose />
        </button>
        <div className="item-img-container">
          <img
            src={flopItems[currID].img[currImg]}
            alt={flopItems[currID].title}
            className="item-img slipper-img"
          />
          {flopItems[currID].img.map((flopImg, index) => {
            return (
              <img
                src={flopItems[currID].img[index]}
                alt={flopItems[currID].title}
                onClick={() => {
                  setCurrImg(index);
                }}
                className="thumbnail-img"
              />
            );
          })}
        </div>
        <div className="item-info">
          <header>
            <h4 className="flop-title">{flopItems[currID].title}</h4>
            <h4 className="price">Unit Price: <span className="prc"> ${flopItems[currID].price} </span></h4>
            <h4 className="price">
              Subtotal:
            <span className="prc"> ${Number((flopItems[currID].price * qty).toFixed(2))} </span>
            </h4>
          </header>
          <p className="item-text desc">{flopItems[currID].desc}</p>
          <div className="price-container">
            <h4 className="qty">Item Qty: <span className="prc"> {flopItems[currID].qty} </span></h4>
            <h4 className="price-spec">
              Item Total:  
              <span className="prc special"> 
              $
              {Number(
                (flopItems[currID].price * flopItems[currID].qty).toFixed(2)
              )}
              </span>
            </h4>
          </div>

          <div className="buy-btn-container">
            <button
              data-testid="minus-btn"
              className="decItem buy-btn"
              onClick={() => setQty(qty > 0 ? qty - 1 : 0)}
            >
              <FaRegMinusSquare />
            </button>
            <input
              data-testid="itemQty"
              type="number"
              className="itemQty"
              value={qty}
              ref={count}
              onChange={() => {
                if(isNaN(qty)){
                  setQty(0);
                }
                else{
                  setQty(parseInt(count.current.value));
                }
              }}
            />
            <button
              className="addItem buy-btn"
              data-testid="plus-btn"
              onClick={() => setQty(qty + 1)}
            >
              <FaRegPlusSquare />
            </button>
          </div>

          <button
            className="buyItem buy-btn"
            onClick={addCartItems}
            data-testid="buy-btn"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
