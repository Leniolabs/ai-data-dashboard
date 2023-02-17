import styles from "../../styles/Components.module.scss";
import { ButtonGithub } from "../../components/layout/ButtonGithub";

export function WelcomeHeader(props: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  return (
    <div className={styles.welcomeHeader}>
      <ButtonGithub />
      <div className={styles.title}>{props.title}</div>
      <div className={styles.subtitle}>{props.subtitle}</div>
    </div>
  );
}
