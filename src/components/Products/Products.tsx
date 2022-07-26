import axios from "axios";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { IProduct } from "../../models/models";
import { categoryContext } from "../../pages/Catalog/Catalog";
import { GET_ALL_PRODUCTS } from "../../static/urls";
import { getAllProdcutsByCategory } from "../../utils/urlFunctions";
import { ProductCard } from "../ProductCard/ProductCard";
import cl from "./Products.module.scss";

export const Products: React.FC = () => {
  const categoryName = useContext(categoryContext),
    [products, setProducts] = useState<IProduct[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(false),
    [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(
    async function () {
      try {
        setError(null);
        setIsLoading(true);
        const res =
          categoryName === "all" || categoryName === undefined
            ? await axios.get(GET_ALL_PRODUCTS)
            : await axios.get(getAllProdcutsByCategory(categoryName));
        if (res.data.length === 0) {
          throw new Error("Error 404: category not found");
        }
        setIsLoading(false);
        setProducts(res.data);
      } catch (err) {
        const errMessage = (err as Error).message;
        console.error(errMessage);
        setError(errMessage);
        setIsLoading(false);
      }
    },
    [categoryName]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={cl.root}>
      <h2>Products</h2>
      {isLoading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : error ? (
        <h3 style={{ color: "#8b0000", textAlign: "center" }}>{error}</h3>
      ) : (
        <div className={cl.mainGrid}>
          {products.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};
