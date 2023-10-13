import Skeleton from "~/components/Partials/Skeleton";

import styles from "./styles.module.css";

export function CarShimmer() {
  return (
    <div className="card card-car p-1">
      <div className="card-header">
        <div className="car-info">
          <Skeleton className={styles["car--day"]} />
          <Skeleton className={[styles["car--tilte"], "mt-3"]} />
        </div>
      </div>
      <div className="car-image">
        <Skeleton className={styles["car--image"]} />
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted d-block">
              <Skeleton className={styles["car--spec--title"]} />
            </span>
            <Skeleton className={[styles["car--spec--description"], "mt-2"]} />
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">
              <Skeleton className={styles["car--spec--title"]} />
            </span>
            <Skeleton className={[styles["car--spec--description"], "mt-2"]} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <span className="text-muted d-block">
              <Skeleton className={styles["car--spec--title"]} />
            </span>
            <Skeleton className={[styles["car--spec--description"], "mt-2"]} />
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">
              <Skeleton className={styles["car--spec--title"]} />
            </span>
            <Skeleton className={[styles["car--spec--description"], "mt-2"]} />
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <Skeleton className={[styles["car--price"], "mb-0 pb-0"]} />
        <Skeleton className={styles["car--button"]} />
      </div>
    </div>
  );
}
