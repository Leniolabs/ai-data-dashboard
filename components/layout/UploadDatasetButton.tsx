import React from "react";
import { Button } from "./Button";
import styles from "../../styles/Components.module.scss";
import papa from "papaparse";
import { parseData, stringifyData } from "../../utils/parseData";

interface UploadDatasetButtonProps {
  onUpload: (dataset: string) => void;
}

export function UploadDatasetButton(props: UploadDatasetButtonProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const handleUploadFileClick = React.useCallback(() => {
    inputFileRef.current?.click?.();
  }, []);
  const handleUploadFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target) {
        const inputFile = (e.target as HTMLInputElement).files?.[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          const text = event?.target?.result as string;
          if (text) {
            const data = parseData(text);
            props.onUpload?.(stringifyData(data));
          }
        };

        if (inputFile) reader.readAsText(inputFile);
      }
    },
    [props.onUpload]
  );

  return (
    <>
      <Button className={styles.uploadButton} onClick={handleUploadFileClick}>
        Upload Data
      </Button>
      <input
        ref={inputFileRef}
        hidden
        type="file"
        onChange={handleUploadFile}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </>
  );
}
