import React from "react";
import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function TextAreaInput(
  props: React.PropsWithChildren<{
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
  }>
) {
  const ref = React.createRef<HTMLTextAreaElement>();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );
  return (
    <div
      className={className(
        styles.textAreaInput,
        props.disabled && styles.disabled
      )}
    >
      <div className={styles.label}>{props.label}</div>
      <textarea ref={ref} onChange={handleChange} value={props.value} />
    </div>
  );
}
