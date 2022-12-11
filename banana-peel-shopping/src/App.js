// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  return (
    
    <Routes>
      <Route path='/' element={<Dashboard cartItems={cartItems} setCartItems={setCartItems}/>} />
      <Route path='/Cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} checkedItems={checkedItems} setCheckedItems={setCheckedItems} itemTotal={itemTotal} setItemTotal={setItemTotal}/>} />
      <Route path='/Checkout' element={<Checkout/>} />
    </Routes>
  );
}


export default App;
