import React, { createContext, useState } from "react";
import flops from "../data";

const allTypes = ["ALL", ...new Set(flops.map((flop) => flop.type))];

export const ShopContext = createContext();

const Provider = (props) => {
  const [flopItems, setFlopItems] = useState(flops);
  const [currID, setCurrID] = useState(0);
  const [types, setTypes] = useState(allTypes);
  const [cartItems, setCartItems] = useState([]);

  return (
    <ShopContext.Provider
      value={{
        flopItemsContext: [flopItems, setFlopItems],
        currIDContext: [currID, setCurrID],
        typesContext: [types, setTypes],
        cartItemsContext: [cartItems, setCartItems],
      }}
    >
        {props.children}
    </ShopContext.Provider>
  );
};

export default Provider;
