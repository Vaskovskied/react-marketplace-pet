import axios from "axios";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { IProduct } from "../../models/models";
import { categoryContext } from "../../pages/Catalog/Catalog";
import { GET_ALL_PRODUCTS } from "../../static/urls";
import { getAllProdcutsByCategory } from "../../utils/urlFunctions";
import { ProductCard } from "../ProductCard/ProductCard";
import cl from "./Products.module.scss";

export const Products: React.FC = () => {
  const categoryId = useContext(categoryContext);
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(
    async function () {
      const res =
        categoryId === "all" || categoryId === undefined
          ? await axios.get(GET_ALL_PRODUCTS)
          : await axios.get(getAllProdcutsByCategory(categoryId));
      setProducts(res.data);
    },
    [categoryId]
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
