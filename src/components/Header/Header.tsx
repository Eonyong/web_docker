import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className={styles.Header}>
      <Link to="/contact">
        <p>This is Header</p>
      </Link>
      <textarea className={styles.textarea} placeholder="Search" rows={1} />
      <nav className={styles.Menu}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
