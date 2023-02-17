import styles from "../../styles/Components.module.scss";

export function HireUs() {
  return (
    <div className={styles.hireUsContainer}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.5 143.5">
          <g className={styles.logoFill}>
            <path d="M143.5 143.5H0V0h143.5v35.8h-7.2V7.3H7.3v129h129v-29.8h7.2z"></path>
            <path d="M62.1 85.4H80v6H54.7V53.1h7.4v32.3zM110.4 97.1h-24v-5.7h24v5.7z"></path>
          </g>
          <circle fill="#30AAB3" cx="26.4" cy="27.3" r="8.3"></circle>
        </svg>
        <div className={styles.linksWrapper}>
          <a
            target="_blank"
            className={styles.hireUs}
            rel="noreferrer"
            href="https://www.leniolabs.com/services/"
          >
            Crafted with <span>♥</span> by Leniolabs_
          </a>
          <a
            target="_blank"
            className={styles.hireUsButton}
            rel="noreferrer"
            href="https://www.leniolabs.com/services/"
          >
            Hire our front end team!
          </a>
        </div>
      </div>
    </div>
  );
}
