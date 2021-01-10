import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { shoppingCartContext } from "../../../context/ShoppingCart";
const Card = (props) => {
  const history = useHistory();
  const toAbout = (e) => {
    e.preventDefault();
    history.push(`/shop/about/${e.target.getAttribute("id")}`, {
      productData: props.data
    });
  };

  const { dispatch } = React.useContext(shoppingCartContext);
  const addToCart = (e) => {
    e.preventDefault();
    let payload = props.data;
    payload.count = 1;
    dispatch({ type: "ADD", payload: payload });
    toast.success("Added To Cart");
  };
  return (
    <div className="item-card">
      <img
        onClick={toAbout}
        className="hover-shrink card-img"
        src={props.data.imageUrl}
        alt=""
        id={props.data.id}
      />
      <div className="text">
        <h4>{props.data.name}</h4>
        <p className="text-des">
          {`${props.data.description.substring(0, 100)} ...`}
        </p>
        <p className="text-des">${props.data.price}</p>
        {/*     <button className="hover-shrink button-info">Quick View</button> */}
        <button className="hover-shrink" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
