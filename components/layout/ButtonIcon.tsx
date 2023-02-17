import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";
import { Icon } from "./Icon";

export function ButtonIcon(
  props: React.PropsWithChildren<{
    onClick?: () => void;
    icon: string;
  }>
) {
  return (
    <button className={className(styles.buttonIcon)} onClick={props.onClick}>
      <Icon icon={props.icon} />
    </button>
  );
}
