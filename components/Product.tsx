import React from "react";
import { Product } from "../models/Product";
import "./Product.css";

const Product: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <div
        style={{ backgroundImage: `url(${product.image})` }}
        className="product-img img-one"
      />
      <div className="product-text">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-cart">
        <button type="submit">Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
