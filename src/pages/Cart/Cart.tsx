import React from "react";
import CartItem from "../../components/CartItem/CartItem";
import TrashSVG from "../../components/icons/TrashSVG";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import useAppSelector from "../../hooks/redux/useAppSelector";
import { emtpyCart } from "../../store/slices/cartSlice";
import cl from "./Cart.module.scss";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: cartItems,
    allAmount: cartAmount,
    allCost: cartCost,
  } = useAppSelector((state) => state.cart);
  return (
    <div className={cl.root}>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <div className={cl.cartItems}>
          {cartItems.map((item) => (
            <CartItem cartItem={item} key={item.product.id} />
          ))}
        </div>
      )}

      <div className={cl.cartTotal}>
        <div className={cl.cartTotalInner}>
          <span className={cl.cartTotalInfo}>
            {cartAmount} item{cartAmount > 1 && "s"}: $
            <strong>{cartCost}</strong>
          </span>
          <button
            className={cl.deleteAllBtn}
            onClick={() => dispatch(emtpyCart())}
          >
            empty cart
            <TrashSVG styles={cl.trashIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
