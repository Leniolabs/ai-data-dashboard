import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function Button(
  props: React.PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    outline?: boolean;
    disabled?: boolean;
  }>
) {
  return (
    <button
      className={className(
        styles.button,
        props.outline && styles.outline,
        props.disabled && styles.disabled,
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
