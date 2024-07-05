import Siderbar from "../components/Siderbar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Siderbar />
      <Map />
    </div>
  );
}
