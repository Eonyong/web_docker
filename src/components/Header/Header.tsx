import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className={styles.Header}>
      <Link className={styles.Link} to="/">
        This is Logo
      </Link>
      <textarea className={styles.textarea} placeholder="Search" rows={1} />
      <nav className={styles.Menu}>
        <ul>
          <li>
            <Link className={styles.Link} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.Link} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
