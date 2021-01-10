import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { app, db } from "../../firebase";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/Auth";
import { shoppingCartContext } from "../../context/ShoppingCart";
import axios from "axios";
const CheckoutDetails = (props) => {
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
    line1: Yup.string()
      .min(4, "Line1 Must Be At Least 4 Characters")
      .max(30, "Line1 Cannot Exceed 30 Characters")
      .required("Line1 Is Required"),
    line2: Yup.string()
      .min(4, "Line2 Must Be At Least 4 Characters")
      .max(30, "Line2 Cannot Exceed 30 Characters"),
    state: Yup.string()
      .min(2)
      .max(2, "Enter Abbreviation For State")
      .required("State is required"),
    postal_code: Yup.string()
      .min(5, "Enter Zip")
      .max(5, "Zip is only five")
      .required("Zip Code Is Required"),
  });
  const billingFormik = useFormik({
    initialValues: {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      line1: props.user?.line1 || "",
      line2: props.user?.line2 || "",
      state: props.user?.state || "",
      postal_code: props.user?.postal_code || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        userId: props.user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        line1: values.line1,
        line2: values.line2,
        state: values.state,
        postal_code: values.postal_code,
      };
      //save billing info to profile
      await db.collection("users").doc(props.user.uid).update({
        line1: values.line1,
        line2: values.line2,
        state: values.state,
        postal_code: values.postal_code,
      });
      setBilling(true);
    },
  });
  const showCheckOut = (e) => {
    e.preventDefault();
    setCheckOut(!checkOut);
  };
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "24px",
        color: "black",
        backgroundColor: "white",
      },
      ivalid: {
        color: "red",
        backgroundColor: "black",
      },
    },
  };
  const stripe = useStripe();
  const elements = useElements();
  const [billing, setBilling] = React.useState(false);
  const [checkOut, setCheckOut] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [processing, setProcessing] = React.useState("");
  const [succeeded, setSucceeded] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState(true);

  const {
    state: { cart },
    dispatch,
  } = React.useContext(shoppingCartContext);
  React.useEffect(() => {
    const getSecret = async () => {
      const response = await axios({
        method: "post",
        url: `https://us-central1-mr-electronics.cloudfunctions.net/api/payments/create?total=${
          props.total() * 100
        }`,
      });
      setClientSecret(response.data.clientSecret);
      console.log(clientSecret);
    };
    getSecret();
  }, [cart]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setDisabled(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        db.collection("users")
          .doc(props.user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            items: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })
          .then(() => {
            dispatch({ type: "EMPTY" });
            history.replace("/orders");
          });
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <>
      {checkOut ? (
        <>
          {!billing ? (
            <div className="register-container payment-container">
              <div className="item-card">
                <div className="text">
                  <h3>Billing Information</h3>
                  <form onSubmit={billingFormik.handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        value={billingFormik.values.firstName}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="firstName">First Name</label>
                      <span>{billingFormik.errors.firstName}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        value={billingFormik.values.lastName}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="lastName">Last Name</label>
                      <span>{billingFormik.errors.lastName}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={billingFormik.values.email}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="email">Email</label>
                      <span>{billingFormik.errors.email}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line1"
                        value={billingFormik.values.line1}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="line1">Line One</label>
                      <span>{billingFormik.errors.line1}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="line2"
                        value={billingFormik.values.line2}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="line2">Line Two</label>
                      <span>{billingFormik.errors.line2}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="state"
                        value={billingFormik.values.state}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="state">State</label>
                      <span>{billingFormik.errors.state}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="postal_code"
                        value={billingFormik.values.postal_code}
                        onChange={billingFormik.handleChange}
                      />
                      <label htmlFor="postal_code">Postal Code</label>
                      <span>{billingFormik.errors.postal_code}</span>
                    </div>
                    <button className="cart-button hover-shrink" type="submit">
                      Submit Billing Info
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="register-container payment-container">
              <div className="item-card">
                <div className="text">
                  <h3>Payment Details</h3>
                  <form onSubmit={handleSubmit}>
                    <CardElement
                      options={cardElementOptions}
                      onChange={handleChange}
                    />
                    <button
                      disabled={processing || disabled || succeeded}
                      className={
                        !disabled ? `cart-button hover-shrink` : `cart-button`
                      }
                    >
                      <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          className="cart-button hover-shrink"
          onClick={showCheckOut}
          type="submit"
        >
          Check Out
        </button>
      )}
    </>
  );
};

export default CheckoutDetails;
