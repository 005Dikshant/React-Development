import Logo from "./Logo.jsx";
import AppNav from "./AppNav";
import Footer from "./Footer.jsx";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

export default function Siderbar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Footer />
    </div>
  );
}
