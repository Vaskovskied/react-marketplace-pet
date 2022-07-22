import React from "react";
import { Link } from "react-router-dom";
import { CartButton } from "../CartButton/CartButton";
import { ShoppingBagSVG } from "../icons/ShoppingBagSVG";
import cl from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={cl.header}>
      <nav>
        <Link to={"/"}>
          <div className={cl.logo}>
            {/* <span>REACT</span> */}
            <ShoppingBagSVG styles={cl.logoIcon} />
            <span>SHOP</span>
          </div>
        </Link>
        <CartButton />
      </nav>
    </header>
  );
};

export default Header;
