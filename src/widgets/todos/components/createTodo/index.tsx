import { FC, useState } from "react";

import UIInput from "../../../../ui/ui-input";
import UISelect from "../../../../ui/ui-select";

import styles from "./CreateTodo.module.scss";
import UIButton from "../../../../ui/ui-button";
import { useForm } from "react-hook-form";
import { useTodoStore } from "../../../../zustand/useTodoStore";
import UITextArea from "../../../../ui/ui-text-area";
import { ITodo } from "../../../../interfaces";
import { useSnackbarStore } from "../../../../zustand/useSnackbarStore";
import { statuses } from "../../../../constants";

const CreateTodoModal: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ITodo, "id">>();

  const { addTodo } = useTodoStore();
  const { addSnackbar } = useSnackbarStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async ({
    date,
    name,
    status,
  }: Omit<ITodo, "id">) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          addTodo({ name, status, date });
          addSnackbar("Задача успешно создана", "success");
          resolve(null);
        }, 1000)
      );
    } catch (e) {
      addSnackbar("Произошла ошибка", "error");
      console.warn(e);
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
        }}
        error={errors.date?.message}
        label="Дата"
      />
      <UIButton
        buttonProps={{ type: "submit", disabled: isLoading }}
        variant="default"
      >
        {isLoading ? "ЗАГРУЗКА..." : "ДОБАВИТЬ"}
      </UIButton>
    </form>
  );
};

export default CreateTodoModal;
