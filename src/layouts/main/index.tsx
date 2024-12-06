import { FC, PropsWithChildren } from "react";

import styles from "./MainLayout.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Snackbar from "../../ui/ui-snackbar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
      <Snackbar />
    </div>
  );
};

export default MainLayout;
