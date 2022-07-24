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
  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async function () {
      try {
        const res =
          categoryName === "all" || categoryName === undefined
            ? await axios.get(GET_ALL_PRODUCTS)
            : await axios.get(getAllProdcutsByCategory(categoryName));
        console.log(res);
        if (res.data.length === 0) {
          throw new Error("Error 404: category is not found");
        }
        setProducts(res.data);
      } catch (err) {
        console.error((err as Error).message);
        navigate("/");
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
