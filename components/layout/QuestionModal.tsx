import React from "react";
import styles from "../../styles/Components.module.scss";
import { Button } from "./Button";
import { ButtonIcon } from "./ButtonIcon";
import { TextInput } from "./TextInput";

export function QuestionModal(
  props: React.PropsWithChildren<{
    onSubmit?: (value: string) => void;
    onCancel?: () => void;
  }>
) {
  const [type, setType] = React.useState<string>("KPI");
  const [question, setQuestion] = React.useState<string>("");

  const handleTextAreaChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQuestion(e.target.value);
    },
    []
  );

  const handleTypeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setType(e.target.value);
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    if (question.trim()) {
      props.onSubmit?.(
        `Always reply using the original Instructions and JSON output format. If you are generating a kpi filters and charts should be an empty array, the same goes for the other two. Return the original format with just a ${type} that follows the following description: "${question}"`
      );
    }
  }, [props.onSubmit, type, question]);

  const handleCancel = React.useCallback(() => {
    props.onCancel?.();
  }, [props.onCancel]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          Add a new item to the dashboard by describing what you want
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentRow}>
            <label>Add another</label>{" "}
            <select value={type} onChange={handleTypeChange}>
              <option value="KPI">KPI</option>
              <option value="Chart">Chart</option>
              <option value="Filter">Filter</option>
            </select>{" "}
            <label>that</label>
          </div>
          <div className={styles.modalContentRow}>
            <textarea
              className={styles.questionModalTextarea}
              onChange={handleTextAreaChange}
              placeholder="displays the relation between column-1 and column-2"
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button outline onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={!question} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
