import React from "react";
import styles from "../../styles/Components.module.scss";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

export function MissingApiKeyMessage(
  props: React.PropsWithChildren<{
    onApiKeyClick: () => void;
    onRandomData: () => void;
  }>
) {
  return (
    <div className={styles.emptyMessageContainer}>
      <div className={styles.emptyMessage}>
        To start analyzing your data,{" "}
        <ButtonLink onClick={props.onApiKeyClick}>
          set up your OpenAI{"'"}s API KEY first.
        </ButtonLink>
        <br />
        or{" "}
        <ButtonLink onClick={props.onRandomData} accent="BRAND">
          try it with random data
        </ButtonLink>
      </div>
    </div>
  );
}
