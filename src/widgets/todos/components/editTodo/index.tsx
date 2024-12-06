import { FC, useEffect, useState } from "react";

import UIInput from "../../../../ui/ui-input";
import UISelect from "../../../../ui/ui-select";

import styles from "./EditTodo.module.scss";
import UIButton from "../../../../ui/ui-button";
import { useForm } from "react-hook-form";
import { ITodo } from "../../../../interfaces";
import UITextArea from "../../../../ui/ui-text-area";
import { useTodoStore } from "../../../../zustand/useTodoStore";
import { useSnackbarStore } from "../../../../zustand/useSnackbarStore";
import { statuses } from "../../../../constants";

interface IEditTodoProps extends ITodo {
  onClose: () => void;
}

const EditTodoModal: FC<IEditTodoProps> = ({
  id,
  name,
  status,
  date,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<ITodo, "id">>();

  const { editTodo } = useTodoStore();
  const { addSnackbar } = useSnackbarStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setValue("name", name);
    setValue("status", status);
    setValue("date", date);
  }, [name, status, date, setValue]);

  const handleSubmitForm = async (data: Omit<ITodo, "id">) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          editTodo({ id, ...data });
          addSnackbar("Задача успешно отредактирована", "success");
          resolve(null);
          onClose();
        }, 1000);
      });
    } catch (e) {
      console.warn(e);
      addSnackbar("Произошла ошибка", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit((data) => handleSubmitForm(data))}
    >
      <h1>Заполните форму</h1>
      <UITextArea
        textareaProps={{
          ...register("name", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
            maxLength: {
              value: 100,
              message: "Максимум 100 символов",
            },
          }),
          defaultValue: name,
        }}
        error={errors.name?.message}
        label="Название"
      />
      <UISelect
        selectProps={{
          ...register("status", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
          }),
          defaultValue: status,
        }}
        error={errors.status?.message}
        label="Статус"
        options={statuses}
      />
      <UIInput
        inputProps={{
          ...register("date", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
          }),
          type: "date",
          defaultValue: date,
        }}
        error={errors.date?.message}
        label="Дата"
      />
      <UIButton
        buttonProps={{ type: "submit", disabled: isLoading }}
        variant="default"
      >
        {isLoading ? "СОХРАНЕНИЕ..." : "СОХРАНИТЬ"}
      </UIButton>
    </form>
  );
};

export default EditTodoModal;
