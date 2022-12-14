// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import flops from './data';

function App() {
  const [flopItems, setFlopItems] = useState(flops);
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  
  console.log("FlopItems: ", flopItems);
  console.log("CartItems: ", cartItems);
  console.log("CheckedItems: ", checkedItems);

  return (
    
    <Routes>
      <Route path='/' element={<Dashboard flopItems={flopItems} setFlopItems={setFlopItems} cartItems={cartItems} setCartItems={setCartItems}/>} />
      <Route path='/Cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} checkedItems={checkedItems} setCheckedItems={setCheckedItems} itemTotal={itemTotal} setItemTotal={setItemTotal} setFlopItems={setFlopItems}/>} />
      <Route path='/Checkout' element={<Checkout checkedItems={checkedItems} itemTotal={itemTotal}/>} />
    </Routes>
  );
}


export default App;
