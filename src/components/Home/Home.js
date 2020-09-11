import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = (props) => {
  //find the 4 most expensive products
  const topProducts = props.data
    .sort((a, b) => parseFloat(b.price) - a.price)
    .slice(0, 4);

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h1>Welcome visitor!</h1>
          <Link to="/products">
            <button className="button">Go to products</button>
          </Link>
        </div>

        {topProducts.map(({ id, name, price, slug, image }) => {
          const formattedPrice = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(price);
          return (
            <Link className="top-card" to={`products/${slug}`} key={id}>
              <img className="top-card-image" src={image} alt="product" />
              <span>{name}</span>
              <div className="price">
                <p>{formattedPrice}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
