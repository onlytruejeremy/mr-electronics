import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { db } from "../../../firebase";
import Card from "../card/Card";
const Section = (props) => {
  const { name } = useParams();
  const [mapped, setMapped] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    let data = [];
    const getData = async () => {
      await db
        .collection(`${name}`)
        .orderBy("name")
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            data.push(docData);
          });
        });
      let cards = data.map((item) => {
        return <Card data={item} />;
      });
      setMapped(cards);
    };
    getData();
  }, []);

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <Layout>
      <div className="category-container">
        <div className="button-nav flex">
          <button
            className="cart-button hover-shrink dark-btn"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        <div className="item-section">{mapped}</div>
      </div>
    </Layout>
  );
};

export default Section;
