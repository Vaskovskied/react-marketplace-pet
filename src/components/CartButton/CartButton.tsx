import React from "react";
import { Link } from "react-router-dom";
import useAppSelector from "../../hooks/redux/useAppSelector";
import CartSVG from "../icons/CartSVG";
import cl from "./CartButton.module.scss";

export const CartButton: React.FC = () => {
  const { allAmount, allCost } = useAppSelector((state) => state.cart);
  return (
    <div className={cl.mainContainer}>
      <span className={cl.cartInfo}>{allAmount}</span>
      <span className={cl.cartInfo}>
        $<strong>{allCost}</strong>
      </span>
      <Link to={"/cart"}>
        <div className={cl.iconContainer}>
          <CartSVG styles={cl.icon} />
        </div>
      </Link>
    </div>
  );
};
