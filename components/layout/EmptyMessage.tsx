import React from "react";
import styles from "../../styles/Components.module.scss";
import { parseData, stringifyData } from "../../utils/parseData";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

export function EmptyMessage(
  props: React.PropsWithChildren<{
    onUpload: (dataset: string) => void;
    onRandomData: () => void;
  }>
) {
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
    <div className={styles.emptyMessageContainer}>
      <div className={styles.emptyMessage}>
        <ButtonLink onClick={handleUploadFileClick}>
          Upload your data
        </ButtonLink>{" "}
        and then click in Analyze or{" "}
        <ButtonLink onClick={props.onRandomData} accent="BRAND">
          try it with random data
        </ButtonLink>
        <input
          ref={inputFileRef}
          hidden
          type="file"
          onChange={handleUploadFile}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
    </div>
  );
}
