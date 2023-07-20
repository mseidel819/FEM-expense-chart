import styles from "./balance.module.css";
import { ReactComponent as Logo } from "../../assets/discover-logo.svg";

const Balance = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>My balance</h2>
        <span className={styles.dollars}>$921.48</span>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
    </div>
  );
};

export default Balance;
