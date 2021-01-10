import React from "react";
import "./styles.css";
import Main from "./components/main/Main";
import { Switch, Route, Redirect } from "react-router-dom";
import StoreFront from "./components/shop/storefront/StoreFront";
import About from "./components/shop/about/About";
import Account from "./components/account/Account";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Section from "./components/shop/sections/Section";
import Cart from "./components/cart/Cart";
import OrderPage from "./components/orders/OrderPage";
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/account/login" exact>
          <Login />
        </Route>
        <Route path="/account/register" exact>
          <Register />
        </Route>
        <Route path="/shop/about/:productId">
          <About />
        </Route>
        <Route path="/shop/" exact>
          <StoreFront />
        </Route>
        <Route path="/shop/category/:name">
          <Section />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/orders">
          <OrderPage />
        </Route>
        <Route
          render={() => {
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    </div>
  );
}
