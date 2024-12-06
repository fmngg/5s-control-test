import { FC, PropsWithChildren } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "./UIModal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UIModal: FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.visible : ""}`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <RxCross2 className={styles.cancel} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default UIModal;
