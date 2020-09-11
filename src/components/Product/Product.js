import React, { useState, useEffect } from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import arrow from "../../images/arrow.png";

const Product = ({ data, history, location, match }) => {
  const [index, setIndex] = useState(0);
  const product = data[index];
  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  //find current product via params and set the Index accordingly
  useEffect(() => {
    const currentItem = data.find(
      (product) => product.slug === match.params.slug
    );
    let indexOfProduct = data.indexOf(currentItem);
    setIndex(indexOfProduct);
  }, [data, match.params.slug]);

  //add functionality to next and previous button by changes the index
  //replace the history to ensure expected behaviour
  const clickHandler = (e) => {
    let target = e.currentTarget.name;
    if (target === "next") {
      const nextProduct = data[index + 1];
      setIndex(index + 1);
      history.replace(nextProduct.slug);
    }
    if (target === "back") {
      const prevProduct = data[index - 1];
      setIndex(index - 1);
      history.replace(prevProduct.slug);
    }
  };

  return (
    <div className="wrapper-product">
      <Link className="back-wrapper" to="/products">
        <img className="back-wrapper-arrow" src={arrow} alt="back-arrow" />
        <h1 className="back-wrapper-headline">Product List</h1>
      </Link>

      <div className="product-card">
        <img
          className="product-card-image"
          src={product.image}
          alt={product.name}
        />
        <span className="product-card-name">{product.name}</span>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-price">{formattedPrice}</p>
      </div>
      <div className="button-wrapper-product">
        <button
          name="back"
          onClick={clickHandler}
          disabled={index <= 0 && true}
        >
          Back
        </button>
        <button
          name="next"
          onClick={clickHandler}
          disabled={index >= data.length - 1 && true}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
