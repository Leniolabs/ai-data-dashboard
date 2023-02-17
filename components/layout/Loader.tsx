import styles from "../../styles/Components.module.scss";

export function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.backdrop} />
      <div className={styles.content}>
        <div>
          <div>Processing... </div>
          <div>It might take several seconds</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="-12 8 100 100"
            overflow="visible"
            fill="#6e7086"
          >
            <defs>
              <circle id="inline" r="6" cx="20" cy="50"></circle>{" "}
            </defs>{" "}
            <use xlinkHref="#inline" x="0">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              ></animate>{" "}
            </use>
            <use xlinkHref="#inline" x="20">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0.25s"
                repeatCount="indefinite"
              ></animate>{" "}
            </use>
            <use xlinkHref="#inline" x="40">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0.5s"
                repeatCount="indefinite"
              ></animate>{" "}
            </use>
            <use xlinkHref="#inline" x="60">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1s"
                begin="0.75s"
                repeatCount="indefinite"
              ></animate>{" "}
            </use>
          </svg>
        </div>
      </div>
    </div>
  );
}
