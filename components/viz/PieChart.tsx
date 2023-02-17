import React from "react";
import { IChart, IDataset } from "../../types";
import styles from "../../styles/Components.module.scss";
import {
  PieChart as RPieChart,
  ResponsiveContainer,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { parseFunc } from "../../utils/parseFunc";
import { ErrorBoundary } from "../layout/ErrorBoundary";
import { palette } from "../../utils/palette";
import { formatNumber } from "../../utils/numberFormatter";

export function PieChart(
  props: React.PropsWithChildren<{
    config: IChart;
    data: IDataset;
  }>
) {
  const myGroupingFunction = React.useMemo(() => {
    return parseFunc(props.config.javascriptFunction, (data: IDataset) => data);
  }, [props.config]);

  const data = React.useMemo(() => {
    if (typeof myGroupingFunction === "function")
      return myGroupingFunction(props.data);
    return null;
  }, [myGroupingFunction, props.config, props.data]);

  if (!data) return null;
  return (
    <ErrorBoundary>
      <ResponsiveContainer width="100%" height="100%">
        <RPieChart width={300} height={300}>
          <Legend />
          <Pie
            data={data}
            nameKey={"x"}
            dataKey={"y"}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            stroke="var(--borderColor)"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatNumber(value as number)} />
        </RPieChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
}
