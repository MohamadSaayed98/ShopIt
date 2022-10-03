import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";

import { logout } from "../../actions/userActions";

import Search from "./Search";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  // const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    setToggle(false);
    // alert.success("Logout successfully");
  };

  const toggleHandler = (e) => {
    e.preventDefault();
    setToggle((prevState) => !prevState);
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img alt="" src="/images/shopit_logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={toggleHandler}
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className={`dropdown-menu ${toggle ? "show" : ""} mt-3`}
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link
                    className="dropdown-item"
                    onClick={() => setToggle(false)}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  className="dropdown-item"
                  onClick={() => setToggle(false)}
                  to="/orders/me"
                >
                  Orders
                </Link>

                <Link
                  className="dropdown-item"
                  onClick={() => setToggle(false)}
                  to="/me"
                >
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
