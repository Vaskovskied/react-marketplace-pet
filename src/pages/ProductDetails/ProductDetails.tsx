import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuyButton from "../../components/BuyButton/BuyButton";
import { IProduct } from "../../models/models";
import cl from "./ProductDetails.module.scss";

const initialState = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<IProduct>(initialState);
  const navigate = useNavigate();
  const { productId } = useParams();

  const fetchProduct = useCallback(
    async function () {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (res.data === "") {
          throw new Error("Erorr 404: product not found");
        }
        setProduct(res.data);
      } catch (err) {
        console.error((err as Error).message);
        navigate("/");
      }
    },
    [productId, navigate]
  );

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className={cl.root}>
      <img src={product.image} alt={product.title} className={cl.image}></img>
      <div className={cl.info}>
        <h2 className={cl.title}>{product.title}</h2>
        {/* <p className={cl.rating}>{product.rating.rate}</p> */}
        <h3 className={cl.price}>
          $<strong>{product.price}</strong>
        </h3>
        <p className={cl.desc}>{product.description}</p>
        <BuyButton product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
