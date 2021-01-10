import React from "react";
import Card from "../card/Card";
import { useHistory } from "react-router-dom";
const FeaturedSection = (props) => {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    if (props.data !== undefined) {
      const data = props.data;
      let arr = data.map((item) => {
        return <Card data={item} key={item.id} />;
      });
      setCards(arr);
    }
  }, [props.data]);
  const history = useHistory();
  const toProducts = (e) => {
    e.preventDefault();
    history.push(`/shop/category/${props.name.toLowerCase()}`);
  };
  return (
    <>
      {props.data && (
        <>
          <hr />
          <div className="section-banner flex">
            <h3>{props.name}</h3>
            <button
              onClick={toProducts}
              className="cart-button dark-btn hover-shrink"
            >
              View All {props.name}
            </button>
          </div>
          <div className="item-section">{cards}</div>{" "}
        </>
      )}
    </>
  );
};

export default FeaturedSection;
