import React from "react";
import styles from "../../styles/Components.module.scss";

export function TextInput(
  props: React.PropsWithChildren<
    {
      label?: React.ReactNode;
      type: "text" | "number" | "textarea";
    } & (
      | {
          type: "text";
          value?: string;
          onChange?: (value: string) => void;
        }
      | {
          type: "textarea";
          value?: string;
          onChange?: (value: string) => void;
        }
      | { type: "number"; value?: number; onChange?: (value: number) => void }
    )
  >
) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (props.type === "text") props.onChange?.(e.target.value);
      else if (props.type === "textarea") props.onChange?.(e.target.value);
      else props.onChange?.(parseInt(e.target.value || "", 10));
    },
    [props.onChange, props.type]
  );

  return (
    <div className={styles.textInput}>
      <div className={styles.label}>{props.label}</div>
      {props.type === "textarea" ? (
        <textarea onChange={handleChange} value={props.value} />
      ) : (
        <input type={props.type} onChange={handleChange} value={props.value} />
      )}
    </div>
  );
}
