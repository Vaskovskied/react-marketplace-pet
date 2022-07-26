import React, { useEffect, useRef, useState } from "react";
import useAppDispatch from "../hooks/redux/useAppDispatch";
import useAppSelector from "../hooks/redux/useAppSelector";
import { setSelectedSort } from "../store/slices/sortSlice";
import cl from "./SortSelect.module.scss";

const SortSelect: React.FC = () => {
  const dispatch = useAppDispatch(),
    [isOpened, setIsOpened] = useState<boolean>(false),
    { selectedSort, sortTypes } = useAppSelector((state) => state.sort),
    sortListRef = useRef<HTMLUListElement>(null),
    sortTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const condition =
        isOpened &&
        sortTypeRef.current &&
        !sortTypeRef.current.contains(e.target as Node) &&
        sortListRef.current &&
        !sortListRef.current.contains(e.target as Node);

      if (condition) {
        setIsOpened(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpened]);

  return (
    <div className={cl.root}>
      <div className={cl.sortWrapper}>
        <span className={cl.label}>sort:</span>
        <div
          ref={sortTypeRef}
          onClick={() => setIsOpened((prev) => !prev)}
          className={cl.sortType}
        >
          <span>{selectedSort.title}</span>
        </div>
      </div>
      {isOpened && (
        <ul className={cl.sortList} ref={sortListRef}>
          {sortTypes.map((item) => (
            <li
              key={item.id}
              className={cl.sortItem}
              onClick={() => {
                dispatch(setSelectedSort(item));
                setIsOpened(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelect;
