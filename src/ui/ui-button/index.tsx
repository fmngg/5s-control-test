import { ButtonHTMLAttributes, FC, PropsWithRef, ReactNode } from "react";
import styles from "./UIButton.module.scss";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  variant: "danger" | "default" | "outlined";
  buttonProps?: PropsWithRef<ButtonHTMLAttributes<HTMLButtonElement>>;
}

const UIButton: FC<ButtonProps> = ({
  className,
  children,
  buttonProps,
  variant,
}) => {
  return (
    <button
      {...buttonProps}
      className={`${className} ${styles.button}
      ${variant === "default" ? styles.default : ""} 
      ${variant === "outlined" ? styles.outlined : ""} 
      ${variant === "danger" ? styles.danger : ""}
      `}
    >
      {children}
    </button>
  );
};

export default UIButton;
