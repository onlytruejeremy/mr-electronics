import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/Auth";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCartProvider } from "./context/ShoppingCart";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <ShoppingCartProvider>
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </ShoppingCartProvider>
  </AuthProvider>,
  rootElement
);
