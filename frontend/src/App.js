import React from "react";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/productDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

import ListOrders from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import ProtectedRoute from "./components/route/protectedRoute";

import { loadUser } from "./actions/userActions";

import store from "./store";
import axios from "axios";

//Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { useSelector } from "react-redux";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  // const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search/:keyword" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />

            <Route exact path="/cart" element={<Cart />} />
            <Route
              exact
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            {stripeApiKey && (
              <Route
                exact
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  </Elements>
                }
              />
            )}

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<NewPassword />}
            />

            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
