import React from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { shoppingCartContext } from "../../context/ShoppingCart";
const Navbar = (props) => {
  const [drop, setDrop] = React.useState(false);
  const openDrop = (e) => {
    e.preventDefault();
    setDrop(!drop);
  };
  const { state, dispatch } = React.useContext(AuthContext);
  const signOut = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT", payload: null });
  };
  const {
    state: { cart },
  } = React.useContext(shoppingCartContext);
  const getItemTotal = () => {
    return cart.reduce((start, current) => {
      return start + current.count;
    }, 0);
  };
  React.useEffect(() => {
    if (drop === true) {
      setTimeout(() => {
        setDrop(!drop);
      }, 3000);
    }
  }, [drop]);
  return (
    <>
      <div className="navbar flex">
        <Link to="/">
          <i class="fas fa-home"></i>
          <span className="icon-text">Home</span>
        </Link>
        <div className="flex store-links">
          <Link to="/shop">
            <i class="fas fa-store"></i>
          </Link>
          <Link to="/cart">
            <i class="fas fa-shopping-cart"></i> {getItemTotal()}
          </Link>
        </div>
        <div className="nav-dropdown">
          <Link to="#" onClick={openDrop}>
            <i class="fas fa-user"></i>
            <span className="icon-text">
              {state.user !== null ? state.user.firstName : "Account"}
            </span>
          </Link>
          <ul
            className={
              drop
                ? "nav-dropdown-items drop-block bkg flex"
                : "nav-dropdown-items  bkg flex"
            }
          >
            {state.user === null ? (
              <>
                <li>
                  <Link to="/account/login">Login</Link>
                </li>
                <li>
                  <Link to="/account/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/cart">
                    <i class="fas fa-shopping-cart"></i> {getItemTotal()}
                  </Link>
                </li>
                <li>
                  <Link to="/orders">
                    <i class="fas fa-file-invoice-dollar"></i>
                  </Link>
                </li>

                <li>
                  <Link to="#" onClick={signOut}>
                    <i class="fas fa-sign-out-alt"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
