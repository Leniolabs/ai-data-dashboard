import styles from "../../styles/Components.module.scss";

export function PanelHeader(props: React.PropsWithChildren<{}>) {
  return <div className={styles.panelHeader}>{props.children}</div>;
}
