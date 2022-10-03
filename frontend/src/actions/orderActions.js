import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatchEvent, getState) => {
  try {
    dispatchEvent({ type: CREATE_ORDER_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatchEvent({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatchEvent({
      type: CREATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//get current logged in user orders
export const myOrders = () => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    dispatchEvent({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (err) {
    dispatchEvent({
      type: MY_ORDERS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatchEvent) => {
  dispatchEvent({
    type: CLEAR_ERRORS,
  });
};

//get Order Details
export const getOrderDetails = (id) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatchEvent({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (err) {
    dispatchEvent({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};
