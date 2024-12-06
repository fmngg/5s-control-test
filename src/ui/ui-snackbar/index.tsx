import { FC } from "react";

import { useSnackbarStore } from "../../zustand/useSnackbarStore";

import styles from "./UISnackbar.module.scss";

const Snackbar: FC = () => {
  const { messages } = useSnackbarStore();

  return (
    <div className={styles.snackbarContainer}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.snackbar} ${styles[message.type]}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Snackbar;
