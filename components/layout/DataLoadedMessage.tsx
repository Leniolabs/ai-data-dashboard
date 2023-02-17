import React from "react";
import styles from "../../styles/Components.module.scss";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

export function DataLoadedMessage(
  props: React.PropsWithChildren<{
    onAnalyze: () => void;
  }>
) {
  return (
    <div className={styles.emptyMessageContainer}>
      <div className={styles.emptyMessage}>
        Click on <ButtonLink onClick={props.onAnalyze}>analyze</ButtonLink> to
        generate the dashboard.
      </div>
    </div>
  );
}
