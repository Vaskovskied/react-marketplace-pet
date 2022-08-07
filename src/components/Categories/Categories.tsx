import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { categoryContext } from "../../pages/Catalog/Catalog";
import { GET_ALL_CATEGORIES } from "../../static/urls";
import cl from "./Categories.module.scss";

export const Categories: React.FC = () => {
  const categoryName = useContext(categoryContext),
    [categories, setCategories] = useState<string[]>([]),
    [isLoading, setIsLoading] = useState<boolean>(false),
    [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(GET_ALL_CATEGORIES);
      if (res.data === "") {
        throw new Error("Error 404: categories not found");
      }
      setIsLoading(false);
      setCategories(res.data);
    } catch (err) {
      const errMessage = (err as Error).message;
      setIsLoading(false);
      setError(errMessage);
      console.error(errMessage);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={cl.mainContainer}>
      {isLoading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : error ? (
        <h3 style={{ color: "#8b0000", textAlign: "center" }}>{error}</h3>
      ) : (
        <ul>
          <Link to="/all">
            <li
              className={`${
                (categoryName === "all" || categoryName === undefined) &&
                cl.categoryActive
              } ${cl.category}`}
            >
              show all
            </li>
          </Link>
          {categories.map((item) => (
            <Link to={`/${item}`} key={item}>
              <li
                className={`${categoryName === item ? cl.categoryActive : ""} ${
                  cl.category
                }`}
              >
                {item}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
