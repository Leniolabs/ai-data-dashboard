import React from "react";
import { IDashboard, IDataset, IDatasetRecord } from "../../types";
import styles from "../../styles/Components.module.scss";
import { DropdownFilter } from "./DropdownFilter";
import { PerformanceIndicator } from "./PerformanceIndicator";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { className } from "../../utils/className";
import { TreemapChart } from "./TreemapChart";

export function Dashboard(
  props: React.PropsWithChildren<{
    dashboard: IDashboard;
    data: IDataset;
  }>
) {
  const [filters, setFilters] = React.useState<
    Pick<IDatasetRecord, keyof IDatasetRecord>
  >({});

  const handleFilterChange = React.useCallback((filter: string) => {
    return (value: string) => {
      setFilters((filters) => ({ ...filters, [filter]: value }));
    };
  }, []);

  const filteredData = React.useMemo(() => {
    if (Object.keys(filters).length) {
      return Object.keys(filters).reduce((result, key) => {
        if (filters[key])
          return result.filter((row) => row[key] == filters[key]);
        return result;
      }, props.data);
    }
    return props.data;
  }, [filters, props.data]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.filtersRow}>
        {props.dashboard.filters.map((filter, index) => (
          <DropdownFilter
            key={`${filter.column}-${index}`}
            config={filter}
            data={props.data}
            onChange={handleFilterChange(filter.column)}
            value={filters[filter.column]}
          />
        ))}
      </div>
      <hr />
      <div className={styles.kpiRow}>
        {props.dashboard.kpis.map((filter, index) => (
          <PerformanceIndicator
            key={`${filter.title}-${index}`}
            config={filter}
            data={filteredData}
          />
        ))}
      </div>
      {props.dashboard.charts.map((chart, index) => (
        <div
          key={`${chart.title}-${index}`}
          className={className(styles.chartCard, styles[chart.chartType])}
        >
          <div className={styles.chartCardTitle}>{chart.title}</div>
          {chart.chartType === "lineChart" && (
            <LineChart config={chart} data={filteredData} />
          )}
          {chart.chartType === "barChart" && (
            <BarChart config={chart} data={filteredData} />
          )}
          {chart.chartType === "pieChart" && (
            <PieChart config={chart} data={filteredData} />
          )}
          {chart.chartType === "treemapChart" && (
            <TreemapChart config={chart} data={filteredData} />
          )}
        </div>
      ))}
    </div>
  );
}
