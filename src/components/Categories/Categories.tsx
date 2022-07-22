import axios from "axios";
import React, { useState, useEffect } from "react";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import useAppSelector from "../../hooks/redux/useAppSelector";
// import { ICategory } from "../../models/models";
import { GET_ALL_CATEGORIES } from "../../static/urls";
import { setActiveCategory } from "../../store/slices/activeCategorySlice";
import cl from "./Categories.module.scss";

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const activeCategory = useAppSelector((state) => state.activeCategory.value);
  const dispatch = useAppDispatch();

  async function fetchCategories() {
    const res = await axios.get(GET_ALL_CATEGORIES);
    setCategories(res.data);
  }

  const onClickSetCategory = (category: string) => {
    dispatch(setActiveCategory(category));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={cl.mainContainer}>
      <h2>Categories</h2>
      <ul>
        <li
          className={`${activeCategory === "all" && cl.categoryActive} ${
            cl.category
          }`}
          onClick={() => onClickSetCategory("all")}
        >
          show all
        </li>
        {categories.map((item) => (
          <li
            className={`${activeCategory === item && cl.categoryActive} ${
              cl.category
            }`}
            onClick={() => onClickSetCategory(item)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
