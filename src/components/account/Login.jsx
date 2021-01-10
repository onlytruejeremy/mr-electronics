import React from "react";
import Layout from "../layout/Layout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { app, db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
const Login = (props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(4, "Email Must Be At Least 4 Characters")
      .max(30, "Email Cannot Exceed 30 Characters")
      .required("Email Is Required"),
    password: Yup.string()
      .min(4, "Password Must Be At Least 4 Characters")
      .max(16, "Password Cannot Exceed 16 Characters")
      .required("Password Is Required")
  });
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        app.auth().onAuthStateChanged((user) => {
          try {
            const uid = user.uid;
            db.collection("users")
              .doc(uid)
              .get()
              .then((doc) => {
                const data = doc.data();
                const { firstName, lastName, email } = data;
                dispatch({
                  type: "LOGIN",
                  payload: {
                    uid,
                    firstName,
                    lastName,
                    email
                  }
                });
                history.push("/shop");
              });
          } catch (error) {
            toast.error(error.message);
          }
        });
      } catch (error) {
        setFormError(error.message);
      }
    }
  });

  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();
  const [formError, setFormError] = React.useState(null);
  return (
    <Layout>
      <div className="register-container">
        <div className="item-card login-card">
          <div className="text">
            <h3>Login</h3>
            <form onSubmit={loginFormik.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={loginFormik.values.email}
                  onChange={loginFormik.handleChange}
                />
                <label htmlFor="email">Email</label>
                <span>{loginFormik.errors.email}</span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                />
                <label htmlFor="password">Password</label>
                <span>{loginFormik.errors.password}</span>
              </div>
              <span>{formError}</span>
              <br />
              <button className="cart-button hover-shrink" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <button
          className="cart-button hover-shrink"
          onClick={(e) => {
            e.preventDefault();
            history.push("/account/register");
          }}
        >
          Need an account?
        </button>
      </div>
    </Layout>
  );
};

export default Login;
