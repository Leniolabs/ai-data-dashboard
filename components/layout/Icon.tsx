import styles from "../../styles/Components.module.scss";

export function Icon(props: { icon: string }) {
  return (
    <div className={styles.icon}>
      <img src={`./${props.icon}.svg`} />
    </div>
  );
}
