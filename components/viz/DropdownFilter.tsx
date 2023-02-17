import React from "react";
import { IDataset, IFilter } from "../../types";
import styles from "../../styles/Components.module.scss";

export function DropdownFilter(
  props: React.PropsWithChildren<{
    config: IFilter;
    data: IDataset;
    onChange?: (value: string) => void;
    value?: string;
  }>
) {
  const values = React.useMemo(() => {
    return props.data
      .map((row) => row[props.config.column])
      .filter((x, i, arr) => arr.indexOf(x) === i)
      .filter((x) => x)
      .sort((a, b) => (a > b ? 1 : -1));
  }, [props.config, props.data]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );

  return (
    <div className={styles.dropdownFilter}>
      <label>{props.config.title}</label>
      <select value={props.value} onChange={handleChange}>
        <option key={"None"} value="">
          None
        </option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
