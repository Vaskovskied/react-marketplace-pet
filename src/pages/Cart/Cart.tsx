import React, { useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import TrashSVG from "../../components/icons/TrashSVG";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import useAppSelector from "../../hooks/redux/useAppSelector";
import { emtpyCart, updateCart } from "../../store/slices/cartSlice";
import cl from "./Cart.module.scss";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: cartItems,
    allAmount: cartAmount,
    allCost: cartCost,
    isLoading,
    error,
  } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch]);

  return (
    <div className={cl.root}>
      <h2>Cart</h2>

      {isLoading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : error !== null ? (
        <h3 style={{ color: "#8b0000", textAlign: "center" }}>{error}</h3>
      ) : !isLoading && cartItems.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>Cart is empty</h3>
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
