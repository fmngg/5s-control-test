import { FC, PropsWithRef, SelectHTMLAttributes } from "react";
import styles from "./UISelect.module.scss";
import { RxExclamationTriangle } from "react-icons/rx";

interface SelectProps {
  className?: string;
  label?: string;
  error?: string;
  selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>;
  options?: string[];
}

const UISelect: FC<SelectProps> = ({
  className,
  error,
  label,
  selectProps,
  options,
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {selectProps?.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <select
        {...selectProps}
        className={`${styles.input} ${
          error ? styles.inputError : ""
        } ${className}`}
      >
        {options?.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {error && (
        <div className={styles.errorText}>
          <RxExclamationTriangle className={styles.icon} />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UISelect;
