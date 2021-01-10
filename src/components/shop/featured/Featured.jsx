import React from "react";
import FeaturedSection from "./FeaturedSection";
import { db } from "../../../firebase";
const Featured = (props) => {
  const [mappedSections, setMappedSections] = React.useState([]);
  React.useEffect(() => {
    const getPhones = async () => {
      let [phones, tablets, laptops] = [[], [], []];
      await db
        .collection("phones")
        .orderBy("date")
        .limit(3)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            phones.push(docData);
          });
        });
      await db
        .collection("laptops")
        .orderBy("date")
        .limit(3)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            laptops.push(docData);
          });
        });
      await db
        .collection("tablets")
        .orderBy("date")
        .limit(3)
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            let docData = doc.data();
            docData.id = doc.id;
            tablets.push(docData);
          });
        });
      let allSections = [
        <FeaturedSection data={phones} key={"Phones"} name={"Phones"} />,
        <FeaturedSection data={laptops} key={"Laptops"} name={"Laptops"} />,
        <FeaturedSection data={tablets} key={"Tablets"} name={"Tablets"} />
      ];
      setMappedSections([...mappedSections, allSections]);
    };
    getPhones();
  }, []);

  return (
    <>
      <div className="featured-container">
        <h2 className="featured-header">Latest Products</h2>
        <p>{mappedSections}</p>
      </div>
    </>
  );
};

export default Featured;
