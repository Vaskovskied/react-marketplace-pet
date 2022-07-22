import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/models";
import BuyButton from "../BuyButton/BuyButton";
import cl from "./ProductCard.module.scss";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className={cl.mainContainer}>
        <div className={cl.imageWrapper}>
          <img
            className={cl.productImage}
            src={product.image}
            alt={product.title}
          />
        </div>
        <h3 className={cl.productTitle}>{product.title}</h3>
        <p className={cl.price}>
          $<strong>{product.price}</strong>
        </p>
        <BuyButton product={product} />
      </div>
    </Link>
  );
};
