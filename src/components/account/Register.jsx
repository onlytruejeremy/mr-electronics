import React from "react";
import Layout from "../layout/Layout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { app, db } from "../../firebase";
import { useHistory } from "react-router-dom";
const Register = (props) => {
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, "Name Must Be At Least 3 Characters")
      .max(16, "Name Cannot Exceed 16 Characters")
      .required("Name Is Required"),
    lastName: Yup.string()
      .min(4, "Name Must Be At Least 3 Characters")
      .max(16, "Name Cannot Exceed 16 Characters")
      .required("Name Is Required"),
    email: Yup.string()
      .min(4, "Email Must Be At Least 4 Characters")
      .max(30, "Email Cannot Exceed 30 Characters")
      .required("Email Is Required"),
    password: Yup.string()
      .min(4, "Password Must Be At Least 4 Characters")
      .max(16, "Password Cannot Exceed 16 Characters")
      .required("Password Is Required"),
    confirmPassword: Yup.string()
      .min(4, "Confirm Password Must Be At Least 4 Characters")
      .max(16, "Confirm Password Cannot Exceed 16 Characters")
      .required("Confirm Password Is Required")
  });
  const registerFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        app
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((cred) => {
            return db.collection("users").doc(cred.user.uid).set({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email
            });
          })
          .then(() => {
            toast.dark("Registered, Sign-In Please");
            history.push("/account/login");
          })
          .catch((error) => {
            setFormError(error.message);
          });
      } else {
        toast.error("Passwords Must Match");
      }
    }
  });
  const [formError, setFormError] = React.useState(null);
  return (
    <Layout>
      <div className="register-container">
        <div className="item-card">
          <div className="text">
            <h3>Create an Account</h3>
            <form onSubmit={registerFormik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={registerFormik.values.firstName}
                  onChange={registerFormik.handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <span>{registerFormik.errors.firstName}</span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={registerFormik.values.lastName}
                  onChange={registerFormik.handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <span>{registerFormik.errors.lastName}</span>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                />
                <label htmlFor="email">Email</label>
                <span>{registerFormik.errors.email}</span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                />
                <label htmlFor="password">Password</label>
                <span>{registerFormik.errors.password}</span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerFormik.values.confirmPassword}
                  onChange={registerFormik.handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <span>{registerFormik.errors.confirmPassword}</span>
              </div>
              <span>{formError}</span>
              <button className="cart-button hover-shrink" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
