import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";

import Product from "./product/Product";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
// import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  // const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, products, error, resPerPage, numOfResults } = useSelector(
    (state) => state.products
  );

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    if (!keyword) {
      setCategory("");
    }

    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let headerString = `All Products: ${numOfResults}`;
  if (keyword) {
    headerString = `Results found: ${numOfResults}`;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Buy Best Product Online" />
          <h1 id="products_heading">{headerString}</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: "$1",
                          1000: "$1000",
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$ ${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => {
                          setCurrentPage(1);
                          return setPrice(price);
                        }}
                      />
                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">categories</h4>
                        <ul className="pl-0">
                          {categories.map((cat) => (
                            <li
                              key={cat}
                              onClick={() => {
                                setCurrentPage(1);
                                return setCategory(cat);
                              }}
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                            >
                              {cat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= numOfResults && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={numOfResults}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                //bootstrap classes and not CSS
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
