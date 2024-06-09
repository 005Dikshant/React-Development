import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </nav>
  );
}
