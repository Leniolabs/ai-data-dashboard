import styles from "../../styles/Components.module.scss";

export function ButtonsRow(props: React.PropsWithChildren<{}>) {
  return <div className={styles.buttonsRow}>{props.children}</div>;
}
