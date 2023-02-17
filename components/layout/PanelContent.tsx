import styles from "../../styles/Components.module.scss";

export function PanelContent(props: React.PropsWithChildren<{}>) {
  return <div className={styles.panelContent}>{props.children}</div>;
}
