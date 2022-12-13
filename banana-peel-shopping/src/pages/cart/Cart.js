import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import "./Cart.scss";
import logo from "../../assets/logo-bp.png";
import { HiOutlineHome} from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

const Cart = ({
  cartItems,
  setCartItems,
  checkedItems,
  setCheckedItems,
  itemTotal,
  setItemTotal,
  setFlopItems
}) => {
  const itemTot = checkedItems.reduce(
    (total, obj) => obj.price * obj.qty + total,
    0
  );
  setItemTotal(itemTot);

  return (
    <div>
      <section className="nav-bar sticky">
        <div className="nav-container">
          <img className="logo" src={logo} alt="logo"></img>
          <Link to="/">
            <button className="cart cart-btn" data-testid="home-btn">
              <HiOutlineHome />
            </button>
          </Link>
        </div>
      </section>
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
          <Navigate to='/' replace={true}/>
        )}
      </div>
      {cartItems.length ? (
        <div className="payables-container">
          <div className="total">
            Item Total: ${Number(itemTotal).toFixed(2)}
          </div>
          {!itemTotal ? (
            <p className="checkout-text">Checkout</p>
          ) : (
            <Link className="checkout-btn" to="/Checkout">
              Checkout
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
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
  setFlopItems
}) => {
  const { title, price, qty, img, desc } = item;
  const [currImg, setCurrImg] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const count = useRef();

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
    // setItemTotal(itemTot);
  };

  const removeCartItem = () => {
    setCurrIndex(index);
    cartItems[index].qty = 0;
    cartItems[index].status = false;

    const filterCart = cartItems.filter((cItem) => cItem !== item);
    const filterChecked = checkedItems.filter((cItem) => cItem !== item);
    setCartItems(filterCart);
    setCheckedItems(filterChecked);
    setFlopItems(prevState => {
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
    setCartItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });
      return newState;
    });
    setFlopItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems(prevState => {
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
    setCartItems(prevState => {
      const newState = prevState.map(obj => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty - 1 };
        }
        return obj;
      });
      return newState;
    });
    setFlopItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty - 1 };
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: obj.qty - 1 };
        }
        return obj;
      });
      return newState;
    });
  };

  const handleSetQty = () => {
    setCurrIndex(index);
    setCartItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: parseInt(count.current.value) };
        }
        return obj;
      });
      return newState;
    });
    setFlopItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: parseInt(count.current.value) };
        }
        return obj;
      });
      return newState;
    });
    setCheckedItems(prevState => {
      const newState = prevState.map((obj) => {
        if (obj.id === cartItems[index].id) {
          return { ...obj, qty: parseInt(count.current.value) };
        }
        return obj;
      });
      return newState;
    });
  };

  useEffect(() => console.log("The cart after update", cartItems), [cartItems]);
  useEffect(
    () => console.log("The checked after update", checkedItems),
    [checkedItems]
  );

  return (
    <div className="cart-item">
      <button onClick={addCheckedItem}>
        <AiOutlineCheckCircle />
      </button>
      <div className="item-img-container">
        <img src={img[currImg]} alt={title} className="item-img slipper-img" />
        {item.img.map((flopImg, index) => {
          return (
            <img
              src={img[index]}
              alt={title}
              onClick={() => {
                setCurrImg(index);
              }}
              className="item-img slipper-img"
            />
          );
        })}
      </div>
      <div>
        <div className="item-info">
          <header>
            <h4>{title}</h4>
            <h4 className="price">Unit Price: ${price}</h4>
          </header>
          <p className="item-text desc">{desc}</p>
          <div>
            <h4>Current item: {cartItems[index].qty}</h4>
            <h4 className="price">
              Total: ${Number((price * qty).toFixed(2))}
            </h4>
          </div>
        </div>
        <div className="buy-btn-container">
          <button
            data-testid="buy-btn"
            className="decItem buy-btn"
            onClick={handleDeductQty}
          >
            {/**sad */}
            <FaRegMinusSquare />
          </button>
          <input
            type="number"
            className="itemQty"
            value={qty}
            ref={count}
            onChange={handleSetQty}
          />
          <button className="addItem buy-btn" onClick={handleAddQty}>
            <FaRegPlusSquare />
          </button>
        </div>
      </div>
      <button onClick={removeCartItem}>-</button>
    </div>
  );
};

export default Cart;
