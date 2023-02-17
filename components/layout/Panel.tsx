import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function Panel(props: React.PropsWithChildren<{}>) {
  return <div className={className(styles.panel)}>{props.children}</div>;
}
