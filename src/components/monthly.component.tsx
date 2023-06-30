import styles from "./monthly.module.css";

type MonthlyProps = {
  total: number;
};

const Monthly = ({ total }: MonthlyProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Total this week</span>
      <div className={styles.monthly}>
        <span className={styles.total_number}>${total}</span>
        <div className={styles.right}>
          <span className={styles.percent}>+2.4%</span>
          <span className={styles.text}>from last week</span>
        </div>
      </div>
    </div>
  );
};

export default Monthly;
