import React from "react";
import Link from "next/link";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <>
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">
            <img src="/logoment.png" alt="Mentalita Logo" className="logo-image" />
          </Link>
        </p>

        <button
          type="button"
          className="button-custom"
          onClick={() => setShowCart(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="lucide lucide-shopping-bag"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" x2="21" y1="6" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
      <hr />
    </>
  );
};

export default Navbar;