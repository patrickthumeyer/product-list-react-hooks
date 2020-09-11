import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import data from "./data/products.json";

function App() {
  return (
    <Router>
      <div className="header-line"></div>
      <div className="main-wrapper">
        <Switch>
          <Route
            path="/products/:slug"
            render={(props) => <Product data={data} {...props} />}
          />
          <Route
            path="/products"
            render={(props) => <Products data={data} {...props} />}
          />
          <Route path="/" render={(props) => <Home data={data} {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
