import React from "react";
import styles from "../../styles/Components.module.scss";
import gtag from "../../lib/gtag";

interface ViewSelectProps {
  value: string;
  onChange?: (value: string) => void;
}

export function ViewSelect(props: ViewSelectProps) {
  const handleChange = React.useCallback(
    (value: string) => {
      return () => {
        gtag.report("event", "view_selection", {
          event_category: "settings",
          event_label: value,
        });
        props.onChange?.(value);
      };
    },
    [props.onChange]
  );

  return (
    <div className={styles.viewSelect}>
      <strong>View: </strong>
      <label>
        <input
          checked={props.value === "prompt"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("prompt")}
        />
        Prompt
      </label>
      <label>
        <input
          checked={props.value === "code"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("code")}
        />
        Code
      </label>
      <label>
        <input
          checked={props.value === "dashboard"}
          type="radio"
          name="view"
          onChange={() => {}}
          onClick={handleChange("dashboard")}
        />
        Dashboard
      </label>
    </div>
  );
}
