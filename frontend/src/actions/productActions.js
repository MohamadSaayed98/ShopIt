import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

//getting all products
export const getProducts =
  (keyword = "", currentPage = 1, price, category) =>
  async (dispatchEvent) => {
    try {
      dispatchEvent({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatchEvent({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatchEvent({
        type: ALL_PRODUCTS_FAIL,
        payload: err.response.data.message,
      });
    }
  };

//getting one product details
export const getProductDetails = (id) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatchEvent({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatchEvent({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//getting one product details
export const newReview = (reviewData) => async (dispatchEvent) => {
  try {
    dispatchEvent({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatchEvent({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatchEvent({
      type: NEW_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

//Clear error
export const clearErrors = () => async (dispatchEvent) => {
  dispatchEvent({
    type: CLEAR_ERRORS,
  });
};
