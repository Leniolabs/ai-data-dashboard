import React from "react";
import styles from "../styles/Components.module.scss";

export default function Dropdown(
  props: React.PropsWithChildren<{
    options: Array<string>;
    onChange?: (value: string) => void;
    title: string,
    value: string
  }>
) {
  const values = React.useMemo(() => {
    return props.options
  }, [props.options]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );

  return (
    <div className={styles.dropdownFilter}>
      <label>{props.title}</label>
      <select value={props.value || values[0]} onChange={handleChange}>
        {values.map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
