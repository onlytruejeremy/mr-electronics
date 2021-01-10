import React from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { shoppingCartContext } from "../../../context/ShoppingCart";
import Layout from "../../layout/Layout";

const About = (props) => {
  const [data, setData] = React.useState();
  const productId = useParams("productId");
  React.useEffect(() => {
    if (props.location.state === null) {
      //get the data from the id
    } else {
      try {
        setData(props.location.state.productData);
      } catch (error) {
        setData(null);
      }
    }
  }, [productId, props.location.state]);
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const history = useHistory();
  const { dispatch } = React.useContext(shoppingCartContext);
  const addToCart = (e) => {
    e.preventDefault(e);
    const payload = {
      ...data,
      count: 1
    };
    dispatch({ type: "ADD", payload: payload });
    toast.success("Added To Cart");
  };
  return (
    <Layout>
      <div className="about-container">
        <div className="flex">
          <button
            className="cart-button hover-shrink dark-btn"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        {data ? (
          <div className="about-grid">
            <div className="grid-left-col">
              <img src={data.imageUrl} alt="" />
            </div>
            <div className="grid-right-col flex">
              <h3 className="grid-item-title">{data.name}</h3>
              <p className="grid-item-text">{data.description}</p>
              <div className="action-section flex">
                <p className="grid-item-price">Price: ${data.price}</p>
                <button
                  className="cart-button hover-shrink"
                  onClick={addToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          "Something Went Wrong"
        )}
      </div>
    </Layout>
  );
};

export default withRouter(About);
