import { FC, InputHTMLAttributes, PropsWithRef } from "react";
import styles from "./UIInput.module.scss";
import { RxExclamationTriangle } from "react-icons/rx";

interface InputProps {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
}

const UIInput: FC<InputProps> = ({ className, error, label, inputProps }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {inputProps?.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        {...inputProps}
        className={`${styles.input} ${
          error ? styles.inputError : ""
        } ${className}`}
      />
      {error && (
        <div className={styles.errorText}>
          <RxExclamationTriangle className={styles.icon} />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UIInput;
