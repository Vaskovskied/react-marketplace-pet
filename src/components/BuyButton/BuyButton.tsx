import React from "react";
import CartSVG from "../icons/CartSVG";
import cl from "./BuyButton.module.scss";
import { IProduct } from "../../models/models";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import { addCartItem } from "../../store/slices/cartSlice";

interface IBuyBtnProps {
  product: IProduct;
}

const BuyButton: React.FC<IBuyBtnProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const onBuyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: IProduct
  ) => {
    e.preventDefault();
    dispatch(addCartItem(product));
  };

  return (
    <button className={cl.buyBtn} onClick={(e) => onBuyClick(e, product)}>
      <span>add to cart</span>
      <CartSVG styles={cl.buyBtnIcon} />
    </button>
  );
};

export default BuyButton;
