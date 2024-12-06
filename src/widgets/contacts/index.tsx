import { FC, useEffect, useRef } from "react";

import UIInput from "../../ui/ui-input";
import UITextArea from "../../ui/ui-text-area";
import UIButton from "../../ui/ui-button";

import styles from "./Contacts.module.scss";
import { useForm } from "react-hook-form";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { useHeaderStore } from "../../zustand/useHeaderStore";

interface ContactsFormFields {
  name: string;
  email: string;
  message: string;
}

const Contacts: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactsFormFields>();

  const { addSnackbar } = useSnackbarStore();

  const { setContactsSection } = useHeaderStore();

  const contactsRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (contactsRef.current) setContactsSection(contactsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = ({ email, message, name }: ContactsFormFields) => {
    console.log({ email, message, name });
    addSnackbar("Сообщение успешно отправлено", "success");
  };

  return (
    <form
      ref={contactsRef}
      className={styles.contacts}
      onSubmit={handleSubmit((data) => handleSubmitForm(data))}
    >
      <h1 className={styles.contactsTitle}>Свяжитесь с нами!</h1>
      <div className={styles.inputs}>
        <UIInput
          label="Имя"
          error={errors.name?.message}
          inputProps={{
            ...register("name", {
              required: {
                value: true,
                message: "Поле обязательно для заполнения",
              },
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа",
              },
            }),
          }}
        />
        <UIInput
          label="Почта"
          error={errors.email?.message}
          inputProps={{
            ...register("email", {
              required: {
                value: true,
                message: "Поле обязательно для заполнения",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат почты",
              },
            }),
          }}
        />
      </div>
      <UITextArea
        label="Сообщение"
        error={errors.message?.message}
        textareaProps={{
          ...register("message", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 20,
              message: "Сообщение должно содержать минимум 20 символов",
            },
          }),
        }}
      />
      <UIButton variant="default">ОТПРАВИТЬ</UIButton>
    </form>
  );
};

export default Contacts;
