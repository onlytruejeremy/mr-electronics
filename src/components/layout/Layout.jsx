import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      <div className="layout-container">
        <Navbar />
        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
