import React from "react";
import { shoppingCartContext } from "../../context/ShoppingCart";
import { useHistory } from "react-router-dom";
const CartItem = (props) => {
  const { dispatch, state } = React.useContext(shoppingCartContext);
  let payload = props.data;
  const removeItem = (e) => {
    e.preventDefault();
    dispatch({ type: "REMOVE", payload: payload });
  };
  const addItem = (e) => {
    e.preventDefault();

    dispatch({ type: "ADD", payload: payload });
  };
  const getTotal = () => {
    return props.data.price * props.data.count;
  };
  const history = useHistory();
  const toAbout = (e) => {
    e.preventDefault();
    history.push(`/shop/about/${e.target.getAttribute("id")}`, {
      productData: props.data,
    });
  };
  const [orders, setOrders] = React.useState(false);
  React.useEffect(() => {
    if (props.orders) {
      setOrders(true);
    }
  }, [props.orders]);

  const [orderItems, setOrderItems] = React.useState([]);
  React.useEffect(() => {
    if (props.orders) {
      let orderCard = props.data.items.map((item) => {
        console.log(item);
        return (
          <>
            <div className="item-info flex">
              <div className="cart-img">
                <img src={item.imageUrl} id={item.id} alt="" />
              </div>
              <div className="item-description order-items-des flex">
                <p className="item-name">{item.name}</p>
                <p>Item Count: {item.count}</p>
                <p>Item Price: ${item.price}</p>
              </div>
            </div>
          </>
        );
      });
      // reduce totalPrice
      let total = props.data.items.reduce((start, current) => {
        return start + current.count * current.price;
      }, 0);
      let totalDiv = (
        <div>
          <p className="order-info">Order Number: {props.data.id}</p>
          <p className="order-info">Order Total: ${total}</p>
        </div>
      );
      orderCard.push(totalDiv);
      setOrderItems(orderCard);
    }
  }, [orders]);
  return (
    <>
      <div className="cart-item-container">
        {!orders ? (
          <>
            {props.data && (
              <div className="cart-item flex">
                <div className="item-info flex">
                  <div className="cart-img">
                    <img
                      onClick={toAbout}
                      src={props.data.imageUrl}
                      id={props.id}
                      className="hover-grow"
                      alt=""
                    />
                  </div>
                  <div className="item-description flex">
                    <p className="item-name">{props.data.name}</p>
                    <p>Item Price: ${props.data.price}</p>
                  </div>
                </div>
                <div className="quantity-outer">
                  <div className="quantity flex">
                    <span className="arrow" onClick={removeItem}>
                      &#x2190;
                    </span>
                    <div className="count">{props.data.count}</div>
                    <span className="arrow arrow-alt" onClick={addItem}>
                      &#x2192;
                    </span>
                  </div>
                  <p>Item Total: ${getTotal()}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {props.data && (
              <>
                <div className="cart-item order-items flex">{orderItems}</div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartItem;
