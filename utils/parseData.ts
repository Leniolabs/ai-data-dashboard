import papa from "papaparse";
import { IDataset, IDatasetRecord } from "../types";

export function isDataValid(dataset: string) {
  try {
    const data = parseData(dataset);
    return !!data.length;
  } catch (err) {
    return false;
  }
}

export function parseData(dataset: string) {
  const result = papa.parse(dataset, {
    header: true,
  });

  if (!result.data) return [];

  const emptyColumns = result.meta.fields || [];

  if (!emptyColumns.length) return result.data as IDataset;

  return (result.data as IDataset)
    .map((row) => {
      delete row[""];
      return row;
    })
    .slice(0, 1000);
}

export function stringifyData(dataset: IDataset, delimiter?: string) {
  return papa.unparse(dataset, {
    delimiter: delimiter || "\t",
  });
}
