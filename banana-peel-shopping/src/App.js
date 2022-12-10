import React, { useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import Provider from './context/itemsContext';


function App() {

  return (
    <Provider>
      <Dashboard/>
    </Provider>
  );
}


export default App;
