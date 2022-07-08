import React from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Contents } from './components/Contents';
import { ShoppingCart } from './components/ShoppingCart';

export default function App() {
  return (

    <div className='m-2'>
      <Navbar />

      <Switch>
        <Route path='/shopping-cart' component={ShoppingCart} />
        <Route path='/' component={Contents} />
      </Switch>
    </div>
  );
}
