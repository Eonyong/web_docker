import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <Link to="/contact">
        <p>This is Header</p>
      </Link>
      <textarea className="textarea" placeholder="Search" rows={1} />
      <p>Menu</p>
    </header>
  );
};

export default Header;
