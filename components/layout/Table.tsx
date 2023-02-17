import React from "react";
import styles from "../../styles/Components.module.scss";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
  Table,
  Getter,
} from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import isEqual from "lodash.isequal";

import { IDataset, IDatasetRecord } from "../../types";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function useCell(
  getValue: Getter<unknown>,
  index: number,
  id: string,
  table: Table<IDatasetRecord>
) {
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue,
    onBlur,
  };
}

const defaultColumn: Partial<ColumnDef<IDatasetRecord>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { value, setValue, onBlur } = useCell(getValue, index, id, table);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

interface TableProps {
  data: IDataset;
  onChange?: (data: IDataset) => void;
}

export function Table(props: TableProps) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const columns: ColumnDef<IDatasetRecord>[] = React.useMemo(() => {
    const row = props.data?.[0];
    if (row) {
      return Object.keys(row).map((name) => ({
        header: name,
        accessorKey: name,
      }));
    }
    return [];
  }, [props.data]);

  const table = useReactTable({
    data: props.data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        // skipAutoResetPageIndex();
        const newData =
          props.data?.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId as unknown as string]:
                  value as (typeof row)[keyof typeof row],
              };
            }
            return row;
          }) || [];

        if (props.onChange && !isEqual(newData, props.data))
          props.onChange?.(newData);
      },
    },
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div ref={tableContainerRef} className={styles.table}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
