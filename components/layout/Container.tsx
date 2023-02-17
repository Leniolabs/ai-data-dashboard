import styles from "../../styles/Components.module.scss";

export function Container(props: React.PropsWithChildren<{}>) {
  return <div className={styles.container}>{props.children}</div>;
}
