import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import useAppSelector from "../../hooks/redux/useAppSelector";
import { IProduct } from "../../models/models";
import { GET_ALL_PRODUCTS } from "../../static/urls";
import { getAllProdcutsByCategory } from "../../utils/urlFunctions";
import { ProductCard } from "../ProductCard/ProductCard";
import cl from "./Products.module.scss";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const activeCategory = useAppSelector((state) => state.activeCategory.value);

  const fetchProducts = useCallback(
    async function () {
      const res =
        activeCategory === "all"
          ? await axios.get(GET_ALL_PRODUCTS)
          : await axios.get(getAllProdcutsByCategory(activeCategory));
      setProducts(res.data);
    },
    [activeCategory]
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
