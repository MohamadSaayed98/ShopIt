import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  let urlString;
  if (!keyword) {
    urlString = "/";
  } else {
    urlString = `/search/${keyword}`;
  }

  const searchHandler = (e) => {
    e.preventDefault();
    // navigate(options, { replace: true });

    window.location = `${urlString}`;
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
