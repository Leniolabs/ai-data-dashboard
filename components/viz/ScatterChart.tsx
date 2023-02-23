import React from "react";
import { IChart, IDataset } from "../../types";
import styles from "../../styles/Components.module.scss";
import { 
  ScatterChart as RScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { parseFunc } from "../../utils/parseFunc";
import { ErrorBoundary } from "../layout/ErrorBoundary";
import { palette } from "../../utils/palette";
import { formatNumber } from "../../utils/numberFormatter";

export function ScatterChart(
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
    <ErrorBoundary >
      <ResponsiveContainer width="100%" height="100%">
        <RScatterChart width={500} height={300} >
          <CartesianGrid stroke="var(--borderColor)" strokeDasharray="5 5" />
          <XAxis dataKey={"x"} stroke="var(--textColor)" tickFormatter={formatNumber} />
          <YAxis dataKey={"y"} stroke="var(--textColor)" tickFormatter={formatNumber} />
          <Tooltip />
          <Scatter data={data} dataKey="y" fill={palette[1]} />
        </RScatterChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}
