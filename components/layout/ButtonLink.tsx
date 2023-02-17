import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function ButtonLink(
  props: React.PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    outline?: boolean;
    disabled?: boolean;

    accent?: "DEFAULT" | "BRAND";
  }>
) {
  return (
    <button
      className={className(
        styles.buttonLink,
        props.className,
        props.accent && styles[props.accent]
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
