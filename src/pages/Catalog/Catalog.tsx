import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import { Categories } from "../../components/Categories/Categories";
import { Products } from "../../components/Products/Products";
import SortSelect from "../../SortSelect/SortSelect";
import cl from "./Catalog.module.scss";

export const categoryContext = createContext<string | undefined>("");

const Catalog: React.FC = () => {
  const { categoryName } = useParams();
  return (
    <div className={cl.root}>
      <categoryContext.Provider value={categoryName}>
        <Categories />
        <SortSelect />
        <Products />
      </categoryContext.Provider>
    </div>
  );
};

export default Catalog;
