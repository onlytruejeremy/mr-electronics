import React from "react";
import { useHistory } from "react-router-dom";
import { shoppingCartContext } from "../../context/ShoppingCart";
import { stripeKey } from "../../stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutDetails from "./CheckoutDetails";
import { AuthContext } from "../../context/Auth";
const CheckoutCard = (props) => {
  const {
    state: { cart },
  } = React.useContext(shoppingCartContext);
  React.useEffect(() => {
    if (cart.length === 0) {
      setHasItems(false);
    } else {
      setHasItems(true);
    }
  }, [cart]);
  const [hasItems, setHasItems] = React.useState(false);
  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((start, current) => {
      return start + current.count * current.price;
    }, 0);
  };
  const stripePromise = loadStripe(stripeKey);
  const { state } = React.useContext(AuthContext);
  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-card">
        {hasItems ? (
          <>
            <p>Cart Total: ${getTotal()}</p>
            {state?.user ? (
              <CheckoutDetails total={getTotal} user={state.user} />
            ) : (
              <>
                <button
                  className="cart-button"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("/account/login");
                  }}
                >
                  Login To Order
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                history.push("/shop");
              }}
              className="cart-button hover-shrink"
            >
              View Store
            </button>
          </>
        )}
      </div>
    </Elements>
  );
};

export default CheckoutCard;
