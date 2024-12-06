import { FC, TextareaHTMLAttributes, PropsWithRef } from "react";
import styles from "./UITextarea.module.scss";
import { RxExclamationTriangle } from "react-icons/rx";

interface TextareaProps {
  className?: string;
  label?: string;
  error?: string;
  textareaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>; // Для textarea
}

const UITextArea: FC<TextareaProps> = ({
  className,
  error,
  label,
  textareaProps,
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {textareaProps?.required && (
            <span className={styles.required}>*</span>
          )}
        </label>
      )}
      <textarea
        {...textareaProps}
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

export default UITextArea;
