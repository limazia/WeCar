import Skeleton from "~/components/Shimmer/Skeleton";

import styles from "./styles.module.css";

export function BotStatus() {
  return (
    <div className={styles.loadingContainer}>
      <Skeleton className={styles.lineOne} />
    </div>
  );
}