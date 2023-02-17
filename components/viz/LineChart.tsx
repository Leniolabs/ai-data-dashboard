import React from "react";
import { IChart, IDataset } from "../../types";
import styles from "../../styles/Components.module.scss";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { parseFunc } from "../../utils/parseFunc";
import { ErrorBoundary } from "../layout/ErrorBoundary";
import { palette } from "../../utils/palette";
import { formatNumber } from "../../utils/numberFormatter";

export function LineChart(
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
        <RLineChart width={500} height={300} data={data}>
          <XAxis dataKey={"x"} stroke="var(--textColor)" />
          <YAxis stroke="var(--textColor)" tickFormatter={formatNumber} />
          <Tooltip />
          <CartesianGrid stroke="var(--borderColor)" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={"y"} stroke={palette[1]} dot={false} />
        </RLineChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
}
