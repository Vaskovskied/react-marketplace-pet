import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { categoryContext } from "../../pages/Catalog/Catalog";
import { GET_ALL_CATEGORIES } from "../../static/urls";
import cl from "./Categories.module.scss";

export const Categories: React.FC = () => {
  const categoryName = useContext(categoryContext);
  const [categories, setCategories] = useState<string[]>([]);

  async function fetchCategories() {
    const res = await axios.get(GET_ALL_CATEGORIES);
    setCategories(res.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={cl.mainContainer}>
      <h2>Categories</h2>
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
              className={`${categoryName === item && cl.categoryActive} ${
                cl.category
              }`}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
