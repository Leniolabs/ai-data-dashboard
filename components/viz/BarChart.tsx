import React from "react";
import { IChart, IDataset } from "../../types";
import styles from "../../styles/Components.module.scss";

import {
  CartesianGrid,
  Legend,
  BarChart as RBarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { parseFunc } from "../../utils/parseFunc";
import { ErrorBoundary } from "../layout/ErrorBoundary";
import { palette } from "../../utils/palette";
import { formatNumber } from "../../utils/numberFormatter";

export function BarChart(
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
        <RBarChart width={500} height={300} data={data}>
          <XAxis stroke="var(--textColor)" dataKey={"x"} />
          <YAxis stroke="var(--textColor)" tickFormatter={formatNumber} />
          <Tooltip />
          <CartesianGrid stroke="var(--borderColor)" strokeDasharray="5 5" />
          <Bar dataKey={"y"} fill={palette[0]} />
        </RBarChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
}
