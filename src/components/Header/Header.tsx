import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/contact">This is Header</Link>
      <p>Tihs is Menu</p>
    </header>
  );
};

export default Header;
