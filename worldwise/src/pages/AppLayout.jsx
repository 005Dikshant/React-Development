import Siderbar from "../components/Siderbar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Siderbar />
      <Map />
    </div>
  );
}
