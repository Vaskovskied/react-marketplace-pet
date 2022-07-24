import React from "react";
import { Link } from "react-router-dom";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import { ICartItem } from "../../models/models";
import {
  decrementCartItem,
  deleteProduct,
  incrementCartItem,
} from "../../store/slices/cartSlice";
import ClearSVG from "../icons/ClearSVG";
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
    <Link to={`/product/${product.id}`}>
      <div className={cl.root}>
        <img className={cl.image} src={product.image} alt={product.title} />
        <div className={cl.info}>
          <h2 className={cl.title}>{product.title}</h2>
          <span className={cl.price}>
            $<strong>{allCost}</strong>
          </span>
          <div className={cl.btnsWrapper}>
            <div className={cl.amountBtnsContainer}>
              <button
                className={cl.signBtn}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(decrementCartItem(cartItem));
                }}
              >
                <MinusSVG styles={cl.icon} />
              </button>
              <span className={cl.amount}>{amount}</span>
              <button
                className={cl.signBtn}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(incrementCartItem(cartItem));
                }}
              >
                <PlusSVG styles={cl.icon} />
              </button>
            </div>
            <button
              className={`${cl.signBtn} ${cl.deleteBtn}`}
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProduct(cartItem));
              }}
            >
              <ClearSVG styles={cl.icon} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
