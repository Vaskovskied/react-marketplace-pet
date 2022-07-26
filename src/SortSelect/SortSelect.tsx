import React, { useState } from "react";
import useAppSelector from "../hooks/redux/useAppSelector";
import cl from "./SortSelect.module.scss";

const SortSelect: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { selectedSort } = useAppSelector((state) => state.sort);

  return (
    <div className={cl.root}>
      <div className={cl.sortWrapper}>
        <span className={cl.label}>sort:</span>
        <div
          onClick={() => setIsOpened((prev) => !prev)}
          className={cl.sortType}
        >
          <span>{selectedSort.title}</span>
        </div>
      </div>
      {isOpened && (
        <ul className={cl.sortList}>
          <li className={cl.sortItem}>ascending</li>
          <li className={cl.sortItem}>descending</li>
        </ul>
      )}
    </div>
  );
};

export default SortSelect;
