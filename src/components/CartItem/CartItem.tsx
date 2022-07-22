import React from "react";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import { ICartItem } from "../../models/models";
import {
  decrementCartItem,
  incrementCartItem,
} from "../../store/slices/cartSlice";
import MinusSVG from "../icons/MinusSVG";
import PlusSVG from "../icons/PlusSVG";
import cl from "./CartItem.module.scss";

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ cartItem }) => {
  const { product, amount, allCost } = cartItem;
  const dispatch = useAppDispatch();

  return (
    <div className={cl.root}>
      <img className={cl.image} src={product.image} alt={product.title} />
      <div className={cl.info}>
        <h2 className={cl.title}>{product.title}</h2>
        <div className={cl.amountPriceContainer}>
          <div className={cl.amountContainer}>
            <button
              className={cl.signBtn}
              onClick={() => dispatch(decrementCartItem(cartItem))}
            >
              <MinusSVG styles={cl.icon} />
            </button>
            <span className={cl.amount}>{amount}</span>
            <button
              className={cl.signBtn}
              onClick={() => dispatch(incrementCartItem(cartItem))}
            >
              <PlusSVG styles={cl.icon} />
            </button>
          </div>
          <span className={cl.price}>
            $<strong>{allCost}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
