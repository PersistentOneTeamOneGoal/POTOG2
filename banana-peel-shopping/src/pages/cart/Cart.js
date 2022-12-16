import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Cart.scss";
import logo from "../../assets/logo-bp.png";
import logoWhite from "../../assets/logo-bp-white3.png";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineCheckCircle, AiFillCheckCircle , AiFillCloseCircle } from "react-icons/ai";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

const Cart = ({
  cartItems,
  setCartItems,
  checkedItems,
  setCheckedItems,
  itemTotal,
  setItemTotal,
  setFlopItems,
}) => {
  const [email, setEmail] = useState("");
  const API_KEY =
  "60428ac9f093651ef3a1becbad12071657c8ea401dc7a02f0f49c9e00ff89159";
  const axios = require("axios");
  
  useEffect(() => {
    setItemTotal(checkedItems.reduce(
      (total, obj) => obj.checked === true ? obj.price * obj.qty + total : total,
      0
    ));
    console.log("log", itemTotal);
  }, [checkedItems, itemTotal, setItemTotal])
  
  //On change handling
  const onChange = (e) => {
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

  return (
    <div>

      <div className="top-nav-bar">
        <Link to='/#prod-container'>
        <a href="#prod-container" id="text-nav-top">
          SELECTED ITEMS ON SALE! CHECK IT OUT!
        </a>
        </Link>
      </div>

      <section className="nav-bar sticky">
        <div className="nav-container">
          <img className="logo" src={logo} alt="logo"></img>
          <Link to="/"
            onClick={() => {
              setCheckedItems((prevState) => {
                const newState = prevState.map((obj) => {
                    return { ...obj, checked: false };
                });
                return newState;
              });
            }}
          >
            <button className="cart cart-btn" data-testid="home-btn">
              <HiOutlineHome />
            </button>
          </Link>
        </div>
      </section>
      <div className="title-page"><h1 id='text-cart'>SHOPPING CART<hr/></h1></div>
      <div className="cart-items-container">
        {cartItems.length ? (
          cartItems.map((item, index) => {
            return (
              <CartItem
                item={item}
                index={index}
                cartItems={cartItems}
                checkedItems={checkedItems}
                setCartItems={setCartItems}
                setCheckedItems={setCheckedItems}
                setFlopItems={setFlopItems}
              />
            );
          })
        ) : (
          <Navigate to="/" replace={true} />
        )}
      {cartItems.length ? (
        <div className="payables-container">
          <div className="total">
            Total: <span className="prc"> ${Number(itemTotal).toFixed(2)} </span>
          </div>
          {!itemTotal ? (
            <p className="checkout-text">Checkout</p>
          ) : (
            <Link className="checkout-btn" to="/Checkout" style={{textDecoration: 'none'}}>
              Checkout
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
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
    </div>
  );
};

const CartItem = ({
  item,
  index,
  cartItems,
  checkedItems,
  setCartItems,
  setCheckedItems,
  setFlopItems,
}) => {
  const { title, price, qty, img, desc } = item;
  const [currImg, setCurrImg] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const count = useRef();
  const [isActive, setIsActive] = useState(false);

  const addCheckedItem = () => {
    setCurrIndex(index);
    checkedItems.map((cItem) =>
      cItem.id === item.id ? (cartItems.checked = true) : cartItems.checked
    );

    item.qty !== 0 && !cartItems.checked
      ? setCheckedItems([...checkedItems, item])
      : setCheckedItems([...checkedItems]);

    if (cartItems.checked) {
      console.log(currIndex);
      const filterDupe = checkedItems.filter((cItem) => cItem !== item);
      const sortItems = filterDupe.sort((item1, item2) => {
        return item1.id - item2.id;
      });
      setCheckedItems(sortItems);
      cartItems.checked = false;
    }
    setCheckedItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, checked: !obj.checked };
        }
        return obj;
      });
      return newState;
    });
  };

  const removeCartItem = () => {
    setCurrIndex(index);
    cartItems[index].qty = 0;
    cartItems[index].status = false;

    const filterCart = cartItems.filter((cItem) => cItem !== item);
    const filterChecked = checkedItems.filter((cItem) => cItem !== item);
    setCartItems(filterCart);
    setCheckedItems(filterChecked);
    setFlopItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: 0 };
        }
        return obj;
      });
      return newState;
    });
  };

  const handleAddQty = () => {
    setCurrIndex(index);
    setCartItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });
      return newState;
    });
    setFlopItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });
      return newState;
    });
  };

  const handleDeductQty = () => {
    setCurrIndex(index);
    setCartItems((prevState) => {
      const newState = prevState.map((obj) => {
        if(obj.qty > 1){
          if (obj.id === cartItems[index].id) {
            return { ...obj, qty: obj.qty - 1 };
          }
        }
        return obj;
      });
      return newState;
    });
    setFlopItems((prevState) => {
      const newState = prevState.map((obj) => {
        if(obj.qty > 1){
          if (obj.id === cartItems[index].id) {
            return { ...obj, qty: obj.qty - 1 };
          }
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems((prevState) => {
      const newState = prevState.map((obj) => {
        if(obj.qty > 1){
          if (obj.id === cartItems[index].id) {
            return { ...obj, qty: obj.qty - 1 };
          }
        }
        return obj;
      });
      return newState;
    });
  };

  const handleSetQty = () => {
    setCurrIndex(index);
    setCartItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          if(isNaN(obj.qty) || obj.qty === 0){
            return { ...obj, qty: 1 };
          }
          else{
            return { ...obj, qty: parseInt(count.current.value) };
          }
        }
        return obj;
      });
      return newState;
    });
    setFlopItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: parseInt(count.current.value) };
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: parseInt(count.current.value) };
        }
        return obj;
      });
      return newState;
    });
  };

  return (
    
    <div className="cart-item">
       <button data-testid="clear-btn" className="btnCheck buy-btn" onClick={addCheckedItem}>
        <div className="cursor-pointer select-none">
          {isActive? <AiFillCheckCircle className="check-icon" color="green" size={60} onClick={()=>{
            setIsActive(!isActive)}} />:
            <AiOutlineCheckCircle className="check-icon" color="green" size={60} onClick={()=>{
            setIsActive(!isActive)}} />
          }
        </div>
        </button>
        
      <div className="item-img-container">
        <img src={img[currImg]} alt={title} className="slipper-img-cart" />
      </div>
      <div>
        <div className="item-info">
          <header>
            <h4 className="title">{title}</h4>
            <h4 className="price">Unit Price: <span className="prc"> ${price} </span> </h4>
          </header>
          <p className="item-text desc">{desc}</p>
          <div className="price-container">
            <h4 className="qty">Item Qty: <span className="prc"> {cartItems[index].qty} </span></h4>
            <h4 className="price">
              Item Total:  <span className="prc"> ${Number((price * qty).toFixed(2))} </span> 
            </h4>
          </div>
        </div>
        <div className="buy-btn-container">
          <button
            data-testid="minus"
            className="decItem buy-btn"
            onClick={handleDeductQty}
          >
            <FaRegMinusSquare />
          </button>
          <input
          data-testid="qty"
            type="number"
            className="itemQty"
            value={qty}
            ref={count}
            onChange={handleSetQty}
          />
          <button data-testid="plus"className="addItem buy-btn" onClick={handleAddQty}>
            <FaRegPlusSquare />
          </button>
        </div>
        
      </div>
      <button data-testid="add-btn"className="btnRemove buy-btn" onClick={removeCartItem}>
        <AiFillCloseCircle color="red" size={60}/></button>
    </div>
  );
};

export default Cart;
