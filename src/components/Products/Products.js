import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.scss";
import arrow from "../../images/arrow.png";
import arrowUp from "../../images/arrow-up.svg";
import queryString from "query-string";
import Spinner from "../../spinner/Spinner";
import { motion } from "framer-motion";

const Products = ({ data, history, location, match }) => {
  //state management
  const initialData = data;
  const [sortedObject, setSortedObject] = useState({
    query: "",
    filteredData: data,
  });
  const [isLoading, setIsLoading] = useState(false);

  //framer motion animation
  // const listItemAnimation = {
  //   hidden: {
  //     opacity: 1,
  //     scale: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       delay: 0,
  //       when: "beforeChildren",
  //     },
  //   },
  // };

  //Query object
  const parsed = queryString.parse(location.search);

  //get user input and filter array according to input and order
  const handleInput = (e) => {
    const query = e.target.value;

    setSortedObject({
      query,
      filteredData: initialData.filter((element) => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      }),
    });
  };

  //Sorting of data functions
  const descending = []
    .concat(sortedObject.filteredData)
    .sort((a, b) => b.price - a.price);
  const ascending = []
    .concat(sortedObject.filteredData)
    .sort((a, b) => a.price - b.price);

  //Change URL on Click
  const handleClick = (e) => {
    const target = e.currentTarget.name;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (target === "reset") {
      history.replace("/products");
    } else {
      history.replace(`/products?sort=${target}`);
    }
  };

  useEffect(() => {
    //Sorting get executed when url changes
    if (parsed.sort === "des") {
      setSortedObject({ filteredData: descending });
    } else if (parsed.sort === "asc") {
      setSortedObject({ filteredData: ascending });
    } else if (!parsed.sort) {
      setSortedObject({ filteredData: initialData });
    }
    // eslint-disable-next-line
  }, [parsed.sort]);

  //map function for list items
  const productList = sortedObject.filteredData.map((product) => {
    const formattedPrice = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(product.price);

    return (
      <Link
        className="list-item"
        to={`${match.url}/${product.slug}`}
        key={product.id}
        // variants={listItemAnimation}
        // initial="hidden"
        // animate="visible"
        // transition={{ delay: 0.1 }}
      >
        <p>{product.name}</p>
        <p>{product.shortDescription}</p>
        <p>{formattedPrice}</p>
      </Link>
    );
  });

  return (
    <section className="products-wrapper">
      <div className="button-wrapper-products">
        <button
          name="reset"
          onClick={handleClick}
          className="button button-reset"
        >
          Reset
        </button>
        <button
          name="asc"
          onClick={handleClick}
          className="button button-sort-asc"
        >
          Sort
        </button>
        <button
          name="des"
          onClick={handleClick}
          className="button button-sort-des"
        >
          Sort
        </button>
      </div>
      <div className="search-wrapper">
        <p>Search:</p>
        <input
          placeholder="What are you looking for?"
          type="text"
          onChange={handleInput}
          value={sortedObject.query}
          name="user-input"
        />
      </div>
      <section className="list-wrapper">
        <div className="navigation-wrapper">
          <Link className="back-wrapper" to="/">
            <img className="back-wrapper-arrow" src={arrow} alt="back-arrow" />
            <h1 className="back-wrapper-headline">Home</h1>
          </Link>
          {parsed.sort === "asc" ? (
            <p className="sorting-label">ascending</p>
          ) : parsed.sort === "des" ? (
            <p className="sorting-label">descending</p>
          ) : (
            ""
          )}
        </div>
        <ul className="list">
          <li className="list-header">
            <h3>NAME</h3>
            <h3>DESCRIPTION</h3>
            <div className="price-wrapper">
              {parsed.sort === "asc" ? (
                <img className="arrow-up" src={arrowUp} alt="arrowUp" />
              ) : parsed.sort === "des" ? (
                <img className="arrow-down" src={arrowUp} alt="arrowDown" />
              ) : (
                ""
              )}
              <h3>PRICE</h3>
            </div>
          </li>
          {isLoading ? <Spinner /> : productList}
        </ul>
      </section>
    </section>
  );
};

export default Products;
