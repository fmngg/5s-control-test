import { FC } from "react";

import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/fmngg" target="_blank">
        https://github.com/fmngg
      </a>
    </footer>
  );
};

export default Footer;
