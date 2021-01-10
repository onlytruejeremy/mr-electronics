import React, { useEffect } from "react";
import { shoppingCartContext } from "../../context/ShoppingCart";
import Layout from "../layout/Layout";
import CartItem from "./CartItem";
import CheckoutCard from "./CheckoutCard";
const Cart = (props) => {
  const [cartItems, setCartItems] = React.useState();

  const { state } = React.useContext(shoppingCartContext);
  useEffect(() => {
    setCartItems(
      state.cart.map((item) => {
        return <CartItem data={item} />;
      })
    );
  }, [state]);
  return (
    <Layout>
      <div className="cart-layout flex">
        <div className="cart-items-container">{cartItems}</div>
        <div className="checkout-card-container flex">
          <CheckoutCard />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
