import axios from "axios";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/models";
import { categoryContext } from "../../pages/Catalog/Catalog";
import { GET_ALL_PRODUCTS } from "../../static/urls";
import { getAllProdcutsByCategory } from "../../utils/urlFunctions";
import { ProductCard } from "../ProductCard/ProductCard";
import cl from "./Products.module.scss";

export const Products: React.FC = () => {
  const categoryName = useContext(categoryContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async function () {
      const res =
        categoryName === "all" || categoryName === undefined
          ? await axios.get(GET_ALL_PRODUCTS)
          : await axios.get(getAllProdcutsByCategory(categoryName));
      if (res.data.length === 0) {
        // better to catch error that this
        navigate("/");
      } else {
        setProducts(res.data);
      }
    },
    [categoryName, navigate]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={cl.root}>
      <h2>Products</h2>
      <div className={cl.mainGrid}>
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
