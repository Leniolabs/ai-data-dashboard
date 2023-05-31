import React from "react";
import styles from "../../styles/Components.module.scss";

export default function Dropdown(
  props: React.PropsWithChildren<{
    options: Array<string>;
    onChange?: (value: string) => void;
    title: string,
    value: string
  }>
) {

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );

  return (
    <div className={styles.dropdownFilter}>
      <label>{props.title}</label>
      <select value={props.value || props.options[0]} onChange={handleChange}>
        {props.options.map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
