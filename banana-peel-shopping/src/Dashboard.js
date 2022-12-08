import React, { useRef, useState } from "react";
import flops from "./data";
import "./Dashboard.css";
import logo from "./assets/logo-bp.png";
import logoWhite from "./assets/logo-bp-white3.png";
import banner from './assets/xmas-sale3.png';
import {
  FaShoppingCart,
  FaRegPlusSquare,
  FaRegMinusSquare,
} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

// import Cart from './Cart';

const allTypes = ["ALL", ...new Set(flops.map((flop) => flop.type))];

const Dashboard = () => {
  const [flopItems, setFlopItems] = useState(flops);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [currID, setCurrID] = useState(0);
  const [types, setTypes] = useState(allTypes);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(0);
  const count = useRef();

  const filterItems = (type) => {
    if (type === "ALL") {
      setFlopItems(flops);
      return;
    }
    const newItems = flops.filter((flop) => flop.type === type);
    setFlopItems(newItems);
  };

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
  };
  console.log(cartItems);

  return (
    <main>
      <div className="top-nav-bar">SELECTED ITEMS ON SALE! CHECK IT OUT!</div>
      <section className="nav-bar sticky">
        <div className="nav-container">
        <img className="logo" src={logo} alt="logo"></img>
          <Types types={types} filterItems={filterItems} />
          <button className="cart cart-btn" data-testid="cart-btn">
            <FaShoppingCart />
          </button>
        </div>
      </section>

      <section className="banner-container"><img className="banner" src={banner} alt="banner"></img></section>

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

      {/* {
        showCart &&
        <Cart cartItems={cartItems} setCartItems={setCartItems}/>
      } */}

      <section data-testid="products-container" className="products-container">
        <Products
          flopItems={flopItems}
          setCurrID={setCurrID}
          setShowItemDetail={setShowItemDetail}
        />
      </section>

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
    </main>
  );
};

const Types = ({ types, filterItems }) => {
  return (
    <div className="btn-container">
      {types.map((type, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => filterItems(type)}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};

const Products = ({ flopItems, setCurrID, setShowItemDetail }) => {
  return (
    <div className="products-section">
      {flopItems.map((flopItem, key) => {
        return (
          <Item
            item={flopItem}
            setCurrID={setCurrID}
            setShowItemDetail={setShowItemDetail}
          />
        );
      })}
    </div>
  );
};

const Item = ({ item, setCurrID, setShowItemDetail }) => {
  // const [hover, setHover] = useState(false);
  const { id, title, img, price } = item;

  // const mouseOver = (event) => {
  //   setHover(true);
  // };

  // const mouseOut = (event) => {
  //   setHover(false);
  // };

  return (
    <article
      key={item.id}
      role="products-item"
      data-testid={`products-item${id}`}  
      className="product-item"
      // onMouseOver={mouseOver}  
      // onMouseLeave={mouseOut}
    >
      <div>
        <img src={img} alt={title} className="item-img" />
        <div className="item-info">
          <header>
            <h4>{title}</h4>
            <h4 className="price">${price}</h4>
          </header>
          {/* <p className="item-text">{desc}</p> */}
        </div>
        {/* {hover && ( */}
          <button
            data-testid="look-btn"
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

const ItemModal = ({
  qty,
  setQty,
  flopItems,
  currID,
  setShowItemDetail,
  showCartPrice,
  count,
  addCartItems,
}) => {
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
        <img
          src={flopItems[currID].img}
          alt={flopItems[currID].title}
          className="item-img slipper-img"
        />
        <div className="item-info">
          <header>
            <h4 className="flop-title">{flopItems[currID].title}</h4>
            <h4 className="price">Unit Price: ${flopItems[currID].price}</h4>
            <h4 className="price">
              Subtotal: ${Number((flopItems[currID].price * qty).toFixed(2))}
            </h4>
          </header>
          <p className="item-text desc">{flopItems[currID].desc}</p>
          <div>
            <h4>Current item: {flopItems[currID].qty}</h4>
            <h4 className="price">
              Total: $
              {Number(
                (flopItems[currID].price * flopItems[currID].qty).toFixed(2)
              )}
            </h4>
          </div>

          <div className="buy-btn-container">
            <button
              data-testid="buy-btn"
              className="decItem buy-btn"
              onClick={() => setQty(qty > 0 ? qty - 1 : 0)}
            >
              <FaRegMinusSquare />
            </button>
            <input
              type="text"
              className="itemQty"
              value={qty}
              ref={count}
              onChange={() => {
                //to be worked on, needs to set placeholder to 0 automatically
                setQty(parseInt(count.current.value));
              }}
            />
            <button className="addItem buy-btn" onClick={() => setQty(qty + 1)}>
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
