import React from "react";
import { IChart, IDataset } from "../../types";
import styles from "../../styles/Components.module.scss";
import { Treemap as RTreemap, ResponsiveContainer, Tooltip } from "recharts";
import { parseFunc } from "../../utils/parseFunc";
import { ErrorBoundary } from "../layout/ErrorBoundary";
import { palette } from "../../utils/palette";
import { formatNumber } from "../../utils/numberFormatter";

export function TreemapChart(
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
        <RTreemap
          width={400}
          height={200}
          data={data.map((d) => ({ name: d.x, value: d.y }))}
          stroke="var(--textColor)"
          fill={palette[0]}
        >
          <Tooltip
            //@ts-ignore
            formatter={(d, name, item) => {
              return [
                formatNumber(item.payload.value as number),
                item.payload.name,
              ];
            }}
          />
        </RTreemap>
      </ResponsiveContainer>
    </ErrorBoundary>
  );
}
