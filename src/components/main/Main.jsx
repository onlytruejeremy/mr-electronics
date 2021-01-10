import React from "react";
import Layout from "../layout/Layout";
import { useHistory } from "react-router-dom";
const Main = (props) => {
  const history = useHistory();
  const changePage = (e) => {
    e.preventDefault();
    if (e.target.getAttribute("name") !== "shop") {
      history.push(`/shop/category/${e.target.getAttribute("name")}`);
    } else {
      history.push(`${e.target.getAttribute("name")}`);
    }
  };
  return (
    <Layout>
      <div className="main-container flex">
        <div className="single-col flex">
          <div className="col-text shop hover-shrink normal-cursor bkg flex">
            <h1 onClick={changePage} className="hover-grow" name="shop">
              Shop
            </h1>
          </div>
        </div>
        <div className="two-col flex">
          <div className="col-text phones hover-shrink normal-cursor bkg flex">
            <h1 onClick={changePage} className="hover-grow" name="phones">
              Phones
            </h1>
          </div>
          <div className="col-text tablets hover-shrink normal-cursor bkg flex">
            <h1 onClick={changePage} className="hover-grow" name="tablets">
              Tablets
            </h1>
          </div>
        </div>
        <div className="single-col flex">
          <div className="col-text laptops hover-shrink normal-cursor bkg flex">
            <h1 onClick={changePage} className="hover-grow" name="laptops">
              Laptops
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
