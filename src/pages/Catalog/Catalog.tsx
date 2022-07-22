import React from "react";
import { Categories } from "../../components/Categories/Categories";
import { Products } from "../../components/Products/Products";
import cl from "./Catalog.module.scss";

const Catalog: React.FC = () => {
  return (
    <div className={cl.root}>
      <Categories />
      <Products />
    </div>
  );
};

export default Catalog;
