import React from "react";
import { Redirect } from "react-router-dom";
import Layout from "../layout/Layout";

const Account = (props) => {
  const [user, setUser] = React.useState(false);
  return (
    <>
      {user ? (
        <Layout>
          <h3>You Shouldn't Be Here</h3>
        </Layout>
      ) : (
        <Redirect to="/account/register" />
      )}
    </>
  );
};

export default Account;
