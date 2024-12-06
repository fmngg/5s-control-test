import { FC, useState } from "react";
import UIButton from "../../../../ui/ui-button";

import styles from "./DeleteTodo.module.scss";
import { useTodoStore } from "../../../../zustand/useTodoStore";
import { ITodo } from "../../../../interfaces";
import { useSnackbarStore } from "../../../../zustand/useSnackbarStore";

interface IDeleteTodoProps extends Pick<ITodo, "id"> {
  onClose: () => void;
}

const DeleteTodoModal: FC<IDeleteTodoProps> = ({ id, onClose }) => {
  const { deleteTodo } = useTodoStore();
  const { addSnackbar } = useSnackbarStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          deleteTodo(id);
          addSnackbar("Задача успешно удалена", "success");
          resolve(null);
          onClose();
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
    <div className={styles.container}>
      <h1>Вы действительно хотите удалить задачу?</h1>
      <UIButton
        buttonProps={{ onClick: handleDelete, disabled: isLoading }}
        variant="outlined"
      >
        {isLoading ? "УДАЛЕНИЕ..." : "ДА"}
      </UIButton>
      <UIButton buttonProps={{ onClick: onClose }} variant="default">
        НЕТ
      </UIButton>
    </div>
  );
};

export default DeleteTodoModal;
