import React from "react";
import Layout from "../layout/Layout";
import "./Panel.css";
const AdminPanel = (props) => {
  return (
    <Layout>
      <div className="admin-container">
        <div className="tabs">
          <button>Orders</button>
          <button>Products</button>
          <button>Users</button>
        </div>
        <div className="admin-data">
          <p>Hello</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
