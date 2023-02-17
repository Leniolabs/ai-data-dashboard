export interface ISettings {
  apikey: string;
  sampleRows: number;
}

export interface IFilter {
  title: string;
  column: string;
}

export interface IKPI {
  title: string;
  javascriptFunction: string;
}
export interface IChart {
  title: string;
  chartType: string;
  javascriptFunction: string;
}

export interface IDashboard {
  filters: IFilter[];
  kpis: IKPI[];
  charts: IChart[];
}

export type IDatasetRecord = {
  [key: string]: string;
};

export type IDataset = IDatasetRecord[];
