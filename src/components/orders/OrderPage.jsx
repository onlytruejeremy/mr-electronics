import React from "react";
import Layout from "../layout/Layout";
import CartItem from "../cart/CartItem";
import { db } from "../../firebase";
import { AuthContext } from "../../context/Auth";
const OrderPage = (props) => {
  React.useEffect(() => {
    let data = [];

    db.collection("users")
      .doc(state.user.uid)
      .collection("orders")
      .get()
      .then((onSnapshot) => {
        onSnapshot.forEach((doc) => {
          let docData = doc.data();
          docData.id = doc.id;
          data.push(docData);
          console.log(data);
        });
      })
      .then(() => {
        setOrderCards(
          data.map((item) => {
            return <CartItem orders={true} data={item} />;
          })
        );
      });
  }, []);
  const { state } = React.useContext(AuthContext);
  const [orderCards, setOrderCards] = React.useState([]);
  return (
    <Layout>
      <div className="order-container">{orderCards}</div>
    </Layout>
  );
};

export default OrderPage;
